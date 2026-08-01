"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SpotifyTrackPayload = {
  title: string;
  artists: string;
  coverUrl: string;
  songUrl: string;
  isPlaying: boolean;
  positionSec: number;
  durationSec: number;
};

export const MusicCard = () => {
  const [data, setData] = useState<SpotifyTrackPayload | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/spotify", { cache: "no-store" });
        if (!res.ok) return;
        const payload = (await res.json()) as SpotifyTrackPayload;
        if (payload?.title) {
          setData(payload);
          setElapsed(payload.positionSec ?? 0);
        }
      } catch {
        /* ignore */
      }
    };

    load();
    const pollId = setInterval(load, 15000);
    return () => clearInterval(pollId);
  }, []);

  useEffect(() => {
    if (!data?.isPlaying) return;
    const tickId = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(tickId);
  }, [data?.isPlaying, data?.title]);

  const progressPercent = useMemo(() => {
    const total = data?.durationSec ?? 1;
    if (total <= 0) return 0;
    const current = data?.isPlaying ? elapsed : (data?.positionSec ?? 0);
    return Math.min(100, (current / total) * 100);
  }, [data, elapsed]);

  if (!data) return null;

  return (
    <div className="mt-8 group relative z-0 flex w-full max-w-[480px] items-center gap-3 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/70 p-3 shadow-sm backdrop-blur-xl transition-all sm:gap-4 sm:p-4 dark:border-zinc-800/50 dark:bg-zinc-900/70">
      <div
        className="absolute inset-0 -z-10 scale-110 opacity-30 blur-2xl saturate-200 transition-all duration-700 dark:opacity-40"
        style={{
          backgroundImage: `url(${data.coverUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg shadow-sm sm:h-14 sm:w-14">
        <Link
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0"
        >
          <Image
            src={data.coverUrl}
            alt={data.title}
            width={56}
            height={56}
            unoptimized
            className="h-full w-full object-cover"
          />
        </Link>
        {data.isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <div className="flex h-3 items-end gap-[2px]">
              <span
                className="w-1 animate-[pulse_0.8s_ease-in-out_infinite] rounded-full bg-white"
                style={{ height: "60%" }}
              />
              <span
                className="w-1 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-white"
                style={{ height: "100%" }}
              />
              <span
                className="w-1 animate-[pulse_0.6s_ease-in-out_infinite] rounded-full bg-white"
                style={{ height: "40%" }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="mb-1 sm:mb-1.5 flex items-center gap-1.5 pr-8 sm:pr-0">
          <svg
            className="h-3 w-3 shrink-0 text-[#1DB954] sm:h-3.5 sm:w-3.5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02z" />
          </svg>
          <span className="truncate text-[9px] font-bold uppercase tracking-wider text-zinc-600 sm:text-[10px] dark:text-zinc-300">
            {data.isPlaying
              ? "Shami is Currently Vibing On"
              : "Recently Played by Shami"}
          </span>
        </div>
        <p className="truncate text-sm font-bold leading-tight text-zinc-900 sm:text-base dark:text-white">
          {data.title}
        </p>
        <p className="mt-0.5 truncate text-xs font-medium text-zinc-600 sm:text-sm dark:text-zinc-300">
          {data.artists}
        </p>
      </div>

      <Link
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex sm:mt-2 h-8 w-8 sm:w-8 shrink-0 items-center justify-center rounded-full shadow-sm transition-all duration-300 text-zinc-900 dark:text-white hover:scale-110"
        aria-label="Open in Spotify"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </Link>

      <div className="absolute bottom-0 left-0 h-1 sm:h-1.5 w-full bg-black/5 dark:bg-black/40">
        <div
          className="h-full rounded-r-full bg-[#1DB954]/70 backdrop-brightness-10 backdrop-saturate-150 transition-all duration-1000 ease-linear dark:bg-[#1DB954]/50"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
