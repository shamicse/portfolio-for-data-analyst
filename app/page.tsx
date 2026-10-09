"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projectsData, siteConfig, socialLinks } from "@/data/data";
import "./dreamworld.css";

const worlds = [
  { name: "The beginning", place: "Somewhere between dreams", tag: "MEET THE EXPLORER", start: 0.2, end: 3.1 },
  { name: "The archive", place: "Where curiosity becomes clarity", tag: "SELECTED WORK", start: 3.2, end: 6.0 },
  { name: "The inventory", place: "A few tools for the journey", tag: "SKILLS & BACKGROUND", start: 6.1, end: 9.4 },
  { name: "The next chapter", place: "Good things begin with hello", tag: "LET’S CONNECT", start: 9.5, end: 13.8 },
];
const skills = ["SQL", "Python", "Power BI", "Excel", "Pandas", "Power Query", "DAX", "Data storytelling"];

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [world, setWorld] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [project, setProject] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const current = worlds[world];
  const selected = projectsData[project];

  const travel = useCallback((next: number) => {
    const target = (next + worlds.length) % worlds.length;
    setWorld(target);
    setEntered(true);
    setVisited(old => old.includes(target) ? old : [...old, target]);
    const player = video.current;
    if (player && player.readyState >= 1) player.currentTime = worlds[target].start;
  }, []);

  const goHome = useCallback(() => {
    setEntered(false);
    if (video.current && video.current.readyState >= 1) video.current.currentTime = 9.5;
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) setPaused(true);
    const onChange = () => { if (media.matches) setPaused(true); };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const player = video.current;
    if (!player) return;
    if (paused) player.pause();
    else player.play().catch(() => setPaused(true));
  }, [paused]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { goHome(); return; }
      const target = event.target as HTMLElement;
      if (target.closest("button, a, input, textarea, select")) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        event.preventDefault(); travel(world + 1);
      } else if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        event.preventDefault(); travel(world - 1);
      } else if (event.key === "Enter" && !entered) travel(0);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [entered, world, travel, goHome]);

  useEffect(() => {
    if (entered) heading.current?.focus({ preventScroll: true });
  }, [entered, world]);
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch { window.location.href = `mailto:${siteConfig.email}`; }
  }

  return (
    <main className={`dreamworld ${entered ? "is-exploring" : "is-welcome"}`} data-world={world}>
      <a className="world-skip" href="#world-content">Skip to portfolio content</a>
      <div className="world-backdrop" aria-hidden="true">
        <Image src="/world/poster.jpg" alt="" fill priority sizes="100vw" className="world-poster" />
        {!videoFailed && <video ref={video} className="world-video" autoPlay muted={muted} playsInline preload="auto" poster="/world/poster.jpg"
          onError={() => setVideoFailed(true)}
          onLoadedMetadata={() => { if (video.current) video.current.currentTime = entered ? current.start : 10.4; }}
          onTimeUpdate={() => {
            const player = video.current;
            if (!player) return;
            const end = entered ? current.end : 13.8;
            if (player.currentTime >= end) player.currentTime = entered ? current.start : 9.5;
          }}>
          <source src="/world/dreamworld.mp4" type="video/mp4" />
        </video>}
        <div className="world-shade" /><div className="world-grain" />
        <div className="world-stars"><i /><i /><i /><i /><i /><i /></div>
      </div>

      <header className="world-header">
        <button className="world-brand" onClick={goHome} aria-label="Return to welcome screen"><span className="brand-star">✳</span><span>shami<span className="brand-dot">.</span><small>AN INTERACTIVE PORTFOLIO</small></span></button>
        <span className="header-location"><span className="status-dot" /> JAIPUR, INDIA <span className="header-separator">/</span> OPEN TO OPPORTUNITIES</span>
        <a href={socialLinks.github} target="_blank" rel="noreferrer" className="header-link">GitHub <span>↗</span></a>
      </header>

      <section id="world-content" className="world-stage">
        <div className="world-intro">
          <div className="eyebrow"><span /> {entered ? current.tag : "A LITTLE DIFFERENT. A LITTLE DREAMLIKE."}</div>
          <h1 ref={heading} tabIndex={-1} key={`${entered}-${world}`}>
            {!entered ? <>Welcome to<br />my <em>little</em><br />universe<span className="title-spark">✦</span></> : world === 0 ? <>Curious mind.<br /><em>Data</em> explorer.</> : world === 1 ? <>Small details.<br /><em>Big</em> discoveries.</> : world === 2 ? <>Built on<br /><em>curiosity.</em></> : <>Let’s make<br />something<br /><em>meaningful.</em></>}
          </h1>
          <p className="intro-description">{!entered ? <>I’m Shami Akhtar — a data analyst turning<br className="desktop-break" /> everyday numbers into stories worth exploring.</> : current.place + "."}</p>
          {!entered ? <div className="welcome-actions"><button className="enter-button" onClick={() => travel(0)}>Enter my world <span>↗</span></button><span className="enter-hint">or press <kbd>ENTER</kbd></span></div> : <div className="journey-status"><span className="status-line" /><span>{String(world + 1).padStart(2, "0")} / 04 <span className="muted-label">— {current.name}</span></span></div>}
        </div>

        {!entered ? <aside className="welcome-note"><span className="note-cross">+</span><div className="note-orbit">✧</div><span className="tiny-label">NO PERFECT PATH.<br />JUST A CURIOUS MIND.</span><p>Take a look around.<br />There’s a story in every detail.</p><span className="note-coordinate">26.9124° N &nbsp; 75.7873° E</span></aside> : <section className="story-card" aria-label={current.tag} key={world}>
          <div className="card-topline"><span>{current.tag}</span><span className="card-star">✦</span></div>
          {world === 0 && <><div className="explorer-id"><Image src="/profile.png" width={64} height={64} alt="Shami Akhtar" /><div><h2>Shami Akhtar</h2><p>Data Analyst · Jaipur, India</p></div></div><p className="card-copy">I find the story hiding inside the spreadsheet. From cleaning messy data to building dashboards, I turn questions into clear, useful insights.</p><div className="detail-line"><span>THE JOURNEY</span><p>B.Tech in Computer Science Engineering<br />JECRC University, Jaipur</p></div><div className="detail-line"><span>LOOKING FOR</span><p>Internships, freelance projects & collaborations</p></div><a className="card-action" href={siteConfig.resumePath} target="_blank" rel="noreferrer">View my résumé <span>↗</span></a><button className="quiet-action" onClick={() => travel(1)}>Discover my projects <span>→</span></button></>}
          {world === 1 && <><div className="project-count"><span>PROJECT {String(project + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}</span><div><button aria-label="Previous project" onClick={() => setProject(p => (p + projectsData.length - 1) % projectsData.length)}>←</button><button aria-label="Next project" onClick={() => setProject(p => (p + 1) % projectsData.length)}>→</button></div></div><div className="project-image"><Image src={selected.imgLink} alt={`${selected.title} preview`} fill sizes="(max-width: 700px) 90vw, 360px" /></div><h2 className="project-title">{selected.title}</h2><p className="project-description">{selected.desc}</p><p className="project-tools">{selected.Technologies}</p><div className="project-links">{selected.githubLink && <a className="card-action" href={selected.githubLink} target="_blank" rel="noreferrer">View project <span>↗</span></a>}{selected.previewLink && <a className={selected.githubLink ? "quiet-action" : "card-action"} href={selected.previewLink} target="_blank" rel="noreferrer">Dashboard <span>↗</span></a>}</div>{selected.previewLink && <small className="dashboard-note">Power BI may ask you to sign in.</small>}</>}
          {world === 2 && <><h2>My explorer’s kit.</h2><p className="card-copy">The tools I use to follow a question all the way to an answer.</p><div className="skill-inventory">{skills.map((skill, i) => <div key={skill}><span className="skill-symbol">{["⌘", "⌁", "▥", "▦", "◈", "⋈", "ƒ", "✧"][i]}</span><span>{skill}</span><small>{String(i + 1).padStart(2, "0")}</small></div>)}</div><div className="detail-line"><span>LEARNING CHECKPOINTS</span><p>Microsoft Power BI · IBM SkillsBuild<br />Cisco Data Analyst programs</p></div><a className="card-action" href={siteConfig.resumePath} target="_blank" rel="noreferrer">Explore my résumé <span>↗</span></a></>}
          {world === 3 && <><div className="contact-symbol">✳</div><h2>A new adventure?</h2><p className="card-copy">Have a project, an opportunity, or an interesting question? I’d love to hear about it.</p><a className="email-address" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a className="card-action" href={`mailto:${siteConfig.email}`}>Say hello <span>↗</span></a><button className="quiet-action" onClick={copyEmail}><span aria-live="polite">{copied ? "Email copied!" : "Copy email address"}</span><span>{copied ? "✓" : "⧉"}</span></button><div className="contact-socials"><a href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={socialLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={siteConfig.resumePath} target="_blank" rel="noreferrer">Résumé ↗</a></div></>}
        </section>}
        <div className="scene-caption"><span className="scene-diamond">◇</span><span>{entered ? current.name : "a place for the endlessly curious"}</span></div>
      </section>

      <footer className="world-footer">
        <nav className="world-map" aria-label="Explore portfolio destinations">
          {worlds.map((item, i) => <button key={item.name} className={entered && world === i ? "active" : ""} onClick={() => travel(i)} aria-current={entered && world === i ? "step" : undefined}><span className="map-number">{entered && visited.includes(i) && world !== i ? "✓" : String(i + 1).padStart(2, "0")}</span><span className="map-name">{item.name}</span><span className="map-dot" /></button>)}
        </nav>
        <div className="footer-baseline"><span className="keyboard-hint"><kbd>←</kbd><kbd>→</kbd> to explore <span>·</span> <kbd>ESC</kbd> to return</span><span className="journey-progress" aria-live="polite">{entered ? `${visited.length} of 4 places discovered` : "MADE OF DATA & DAYDREAMS"}</span><div className="playback-controls"><button onClick={() => setPaused(p => !p)} aria-label={paused ? "Play animation" : "Pause animation"} aria-pressed={paused}>{paused ? "▷" : "Ⅱ"}<span>{paused ? "Play" : "Pause"}</span></button><button onClick={() => setMuted(m => !m)} aria-label={muted ? "Enable sound" : "Mute sound"} aria-pressed={!muted}><span className="sound-bars">▂▅▃▆</span><span>Sound {muted ? "off" : "on"}</span></button></div></div>
      </footer>
    </main>
  );
}

