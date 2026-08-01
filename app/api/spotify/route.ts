import { NextResponse } from "next/server";
import { siteConfig, socialLinks } from "@/data/data";

type SpotifyApiTrack = {
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  duration_ms: number;
  external_urls: { spotify: string };
};

type SpotifyCurrentlyPlaying = {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyApiTrack | null;
};

type SpotifyRecentlyPlayed = {
  items: { played_at: string; track: SpotifyApiTrack }[];
};

const FALLBACK = {
  title: "last 6 months's top tracks - may 2024",
  artists: "levender · Spotify Playlist",
  coverUrl:
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=300&h=300&fit=crop",
  songUrl: socialLinks.spotify,
  isPlaying: false,
  positionSec: 45,
  durationSec: 210,
};

async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret) return null;

  const body = refreshToken
    ? new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      })
    : new URLSearchParams({ grant_type: "client_credentials" });

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

function mapTrack(
  track: SpotifyApiTrack,
  isPlaying: boolean,
  progressMs = 0
) {
  return {
    title: track.name,
    artists: track.artists.map((a) => a.name).join(", "),
    coverUrl: track.album.images[0]?.url ?? FALLBACK.coverUrl,
    songUrl: track.external_urls.spotify,
    isPlaying,
    positionSec: Math.floor(progressMs / 1000),
    durationSec: Math.max(1, Math.floor(track.duration_ms / 1000)),
  };
}

export async function GET() {
  try {
    const token = await getSpotifyAccessToken();

    if (token && process.env.SPOTIFY_REFRESH_TOKEN) {
      const currentRes = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );

      if (currentRes.status === 200) {
        const current =
          (await currentRes.json()) as SpotifyCurrentlyPlaying;
        if (current.item) {
          return NextResponse.json(
            mapTrack(current.item, current.is_playing, current.progress_ms)
          );
        }
      }

      const recentRes = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );

      if (recentRes.ok) {
        const recent = (await recentRes.json()) as SpotifyRecentlyPlayed;
        const track = recent.items[0]?.track;
        if (track) {
          return NextResponse.json(mapTrack(track, false, 0));
        }
      }
    }

    if (token) {
      const playlistRes = await fetch(
        `https://api.spotify.com/v1/users/${siteConfig.spotifyUserId}/playlists?limit=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        }
      );

      if (playlistRes.ok) {
        const playlists = (await playlistRes.json()) as {
          items: {
            name: string;
            external_urls: { spotify: string };
            images: { url: string }[];
            tracks: { total: number };
          }[];
        };
        const playlist = playlists.items[0];
        if (playlist) {
          return NextResponse.json({
            title: playlist.name,
            artists: "levender · Public Playlist",
            coverUrl: playlist.images[0]?.url ?? FALLBACK.coverUrl,
            songUrl: playlist.external_urls.spotify,
            isPlaying: false,
            positionSec: 30,
            durationSec: 180,
          });
        }
      }
    }

    return NextResponse.json(FALLBACK);
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
