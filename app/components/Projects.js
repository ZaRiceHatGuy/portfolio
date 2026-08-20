"use client";

import { useMemo, useState } from "react";
import Decrypt from "./Decrypt";
import Reveal from "./Reveal";
import { Section } from "./SectionTitle";
import { techIcon } from "../lib/techIcons";

// @sync-start projects
export const DEFAULT_ITEMS = [
  {
    "name": "HomeFull",
    "desc": "Full-stack web application connecting homeless individuals with job opportunities. Features search and filtering by city, skill, and shelter for improved job accessibility.",
    "github": "https://github.com/Haedyn06/Project-HomeFull.git",
    "live": "https://project-homefull.vercel.app/",
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "JavaScript",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "tone": "lang"
      },
      {
        "name": "CSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        "tone": "lang"
      },
      {
        "name": "Leaflet",
        "icon": "https://cdn.simpleicons.org/leaflet/white",
        "tone": "framework"
      },
      {
        "name": "Next.js",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "tone": "framework"
      },
      {
        "name": "React",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "tone": "framework"
      },
      {
        "name": "Tailwind",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        "tone": "framework"
      },
      {
        "name": "PostCSS",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postcss/postcss-original.svg",
        "tone": "tool"
      },
      {
        "name": "ESLint",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
        "tone": "tool"
      },
      {
        "name": "Vercel",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        "tone": "platform"
      },
      {
        "name": "Firebase",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
        "tone": "data"
      }
    ],
    "createdAt": "2026-01-24T17:21:16Z",
    "pushedAt": "2026-01-25T23:37:58Z"
  },
  {
    "name": "Village Rental",
    "desc": "Desktop application for rental management with CRUD operations across a 5-table relational database. Features real-time cost calculations and an interactive reporting dashboard.",
    "github": "https://github.com/davidntd/VillageRental.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [
      {
        "name": "SQL",
        "icon": "",
        "tone": "lang"
      },
      {
        "name": "Python",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "tone": "lang"
      },
      {
        "name": "PyQt",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/qt/qt-original.svg",
        "tone": "framework"
      },
      {
        "name": "PostgreSQL",
        "icon": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        "tone": "data"
      }
    ],
    "createdAt": "2026-04-05T21:05:52Z",
    "pushedAt": "2026-04-05T21:07:51Z"
  },
  {
    "name": "Quadratic Solver",
    "desc": "Interactive GUI application for solving quadratic equations with real-time graphing. Supports linear, quadratic, and complex root cases with adjustable axis ranges.",
    "github": "https://github.com/davidntd/Quadratic-Calculator.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [],
    "createdAt": "2026-04-05T07:26:15Z",
    "pushedAt": "2026-04-05T07:26:46Z"
  },
  {
    "name": "PingPongPyGame",
    "desc": "Classic arcade game built with Python and Pygame. Features real-time input handling, collision detection, randomized ball direction, and physics-based ball-paddle mechanics.",
    "github": "https://github.com/davidntd/PingPongPyGame.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [],
    "createdAt": "2026-04-05T06:59:16Z",
    "pushedAt": "2026-04-05T07:04:00Z"
  },
  {
    "name": "cpsy-300-project-1",
    "desc": "Cloud computing course project (CPSY 300) — collaborative repo with cloud infrastructure work.",
    "github": "https://github.com/falconvn2006/cpsy-300-project-1.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [],
    "createdAt": "2026-02-04T21:43:05Z",
    "pushedAt": "2026-02-11T00:39:01Z"
  },
  {
    "name": "cpsy-300-project-2",
    "desc": "Second CPSY 300 cloud computing course project — collaborative JavaScript web project.",
    "github": "https://github.com/falconvn2006/cpsy-300-project-2.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [],
    "createdAt": "2026-03-03T07:11:43Z",
    "pushedAt": "2026-04-08T18:40:40Z"
  },
  {
    "name": "itsc-320-assignment-2",
    "desc": "Assignment 2 for the Software Security course at SAIT.",
    "github": "https://github.com/falconvn2006/itsc-320-assignment-2.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [],
    "createdAt": "2026-02-24T03:30:46Z",
    "pushedAt": "2026-03-07T05:54:29Z"
  },
  {
    "name": "NomViet",
    "desc": "Nôm Việt is a reference tool for learning Chữ Nôm, the traditional Vietnamese writing system. You can explore characters by reading, glyph, or stroke count. It also translates Quốc Ngữ into phonetic script with Chữ Nôm candidates.",
    "github": "https://github.com/davidntd/NomViet.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [],
    "createdAt": "2026-08-17T19:33:19Z",
    "pushedAt": "2026-08-19T04:50:55Z"
  },
  {
    "name": "portfolio",
    "desc": "A retro-pixel, single-page Next.js portfolio with a terminal-style start screen. It shows my profile, education, career, tech stack, and projects. The project grid fetches live repo data from GitHub and filters by Newest, Oldest, or Best.",
    "github": "https://github.com/davidntd/portfolio.git",
    "live": null,
    "image": null,
    "video": null,
    "best": false,
    "tech": [],
    "createdAt": "2026-06-14T01:15:02Z",
    "pushedAt": "2026-08-15T22:22:54Z"
  },
  {
    "name": "brown-bakery-site",
    "desc": "gabby david and me",
    "github": "https://github.com/CreefordSanchez/brown-bakery-site",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2025-01-28T02:58:38Z",
    "pushedAt": "2025-02-17T09:43:12Z",
    "tech": [],
    "best": false
  },
  {
    "name": "capstone",
    "desc": "",
    "github": "https://github.com/Alidawood123/capstone",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-01-23T00:44:01Z",
    "pushedAt": "2026-04-21T04:02:46Z",
    "tech": [],
    "best": false
  },
  {
    "name": "arcwellness-backend",
    "desc": "A backend application for SAIT capstone project",
    "github": "https://github.com/falconvn2006/arcwellness-backend",
    "live": "",
    "image": null,
    "video": null,
    "createdAt": "2026-02-19T15:27:10Z",
    "pushedAt": "2026-04-15T18:57:57Z",
    "tech": [],
    "best": false
  },
  {
    "name": "trainsight",
    "desc": "AI workout assistant ",
    "github": "https://github.com/JackGess/trainsight",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-03-09T07:57:25Z",
    "pushedAt": "2026-04-17T08:45:26Z",
    "tech": [],
    "best": false
  },
  {
    "name": "trainsight-backend",
    "desc": "",
    "github": "https://github.com/falconvn2006/trainsight-backend",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-03-09T23:53:15Z",
    "pushedAt": "2026-03-30T22:51:50Z",
    "tech": [],
    "best": false
  },
  {
    "name": "trainsight-ai",
    "desc": "",
    "github": "https://github.com/falconvn2006/trainsight-ai",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-03-18T19:12:44Z",
    "pushedAt": "2026-06-04T17:15:27Z",
    "tech": [],
    "best": false
  },
  {
    "name": "capstone-testing",
    "desc": "A separate version of the capstone project that is only used for testing",
    "github": "https://github.com/falconvn2006/capstone-testing",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-03-24T04:09:33Z",
    "pushedAt": "2026-04-15T03:37:35Z",
    "tech": [],
    "best": false
  },
  {
    "name": "itsc-320-assignment-4",
    "desc": "",
    "github": "https://github.com/falconvn2006/itsc-320-assignment-4",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-03-31T21:05:06Z",
    "pushedAt": "2026-04-17T05:15:59Z",
    "tech": [],
    "best": false
  },
  {
    "name": "arcwellness-admin",
    "desc": "",
    "github": "https://github.com/falconvn2006/arcwellness-admin",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-04-02T04:20:17Z",
    "pushedAt": "2026-04-16T04:44:32Z",
    "tech": [],
    "best": false
  },
  {
    "name": "cursor-hackahon",
    "desc": "",
    "github": "https://github.com/MinhTam2773/cursor-hackahon",
    "live": "https://cursor-hackahon.vercel.app",
    "image": null,
    "video": null,
    "createdAt": "2026-05-23T19:43:29Z",
    "pushedAt": "2026-05-29T15:52:12Z",
    "tech": [],
    "best": false
  },
  {
    "name": "Project-1-simple-LED",
    "desc": "",
    "github": "https://github.com/davidntd/Project-1-simple-LED",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-14T16:34:02Z",
    "pushedAt": "2026-08-14T16:36:40Z",
    "tech": [],
    "best": false
  },
  {
    "name": "Project-2-LED-with-button",
    "desc": "",
    "github": "https://github.com/davidntd/Project-2-LED-with-button",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-14T18:53:57Z",
    "pushedAt": "2026-08-14T18:55:21Z",
    "tech": [],
    "best": false
  },
  {
    "name": "Project-3-Buzzer-with-button",
    "desc": "",
    "github": "https://github.com/davidntd/Project-3-Buzzer-with-button",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-15T01:12:04Z",
    "pushedAt": "2026-08-15T01:13:07Z",
    "tech": [],
    "best": false
  },
  {
    "name": "Project-4-LED-with-photoresistor",
    "desc": "",
    "github": "https://github.com/davidntd/Project-4-LED-with-photoresistor",
    "live": null,
    "image": null,
    "video": null,
    "createdAt": "2026-08-15T02:29:07Z",
    "pushedAt": "2026-08-15T02:32:30Z",
    "tech": [],
    "best": false
  }
];
// @sync-end

const SHOW_COUNT = 4;
const GITHUB_USER = "davidntd";

// Recognizable frameworks / libraries / tools, keyed by package name.

const FILTERS = [
  { id: "best", label: "Best" },
  { id: "recent", label: "Recent Updates" },
  { id: "newest", label: "Newest" },
  { id: "oldest", label: "Oldest" },
];

// Repos that must never appear in any filter (e.g. the site's own repo).
const HIDDEN_REPOS = new Set(["portfolio"]);

// "https://github.com/Owner/RepoName.git" → "reponame" (lowercased)
const repoKeyFromUrl = (url = "") => {
  const m = String(url || "")
    .replace(/\.git$/, "")
    .match(/github\.com\/[^/]+\/([^/?#]+)/i);
  return m ? m[1].toLowerCase() : null;
};
const repoKeyOf = (item) => repoKeyFromUrl(item?.github) || String(item?.name ?? "").toLowerCase();

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

function TechChip({ name, tone = "lang", icon }) {
  const src = icon || techIcon(name);
  const toneCls =
    tone === "platform"
      ? "border-[var(--accent2)]/60 bg-[rgba(var(--accent2-rgb),0.12)]"
      : tone === "data"
        ? "border-[var(--hp)]/60 bg-[rgba(61,220,132,0.12)]"
        : tone === "lang"
          ? "border-[var(--text)]/25 bg-[var(--bg3)]"
          : "border-[var(--accent)]/60 bg-[rgba(var(--accent-rgb),0.12)]";
  return (
    <span
      title={name}
      className={`group/tech relative inline-flex h-8 w-8 items-center justify-center border ${toneCls} cursor-default`}
    >
      {src ? (
        <img src={src} alt={name} width={20} height={20} className="object-contain" />
      ) : (
        <span className="font-pixel text-[0.7rem] leading-none text-[var(--text)]">
          {name.slice(0, 1)}
        </span>
      )}
      <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--border)] bg-[#121218] px-2 py-1 text-[0.62rem] text-[var(--text)] opacity-0 shadow-[0_8px_20px_rgba(0,0,0,0.45)] transition-opacity duration-150 group-hover/tech:opacity-100">
        {name}
      </span>
    </span>
  );
}

function ProjectLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-pixel text-[0.55rem] px-3 py-2 border-2 border-[var(--accent)] text-[var(--accent)] hover:border-[var(--accent2)] hover:text-[var(--accent2)] transition-colors duration-300 inline-flex items-center gap-1.5"
    >
      <Decrypt text={children} />
    </a>
  );
}

/**
 * Projects — the project grid plus the "View more on GitHub" button.
 *
 * All data comes from the admin's content.json (synced via the admin's
 * "Sync from GitHub" button and saved locally). No client-side GitHub
 * fetching occurs. Sort by Best / Recent / Newest / Oldest.
 */
export default function Projects({ items = DEFAULT_ITEMS }) {
  const [filter, setFilter] = useState("newest");
  const [mediaGallery, setMediaGallery] = useState({ open: false, items: [], index: 0 });

  // Build the pool from admin items, filtering out hidden repos.
  const pool = useMemo(() => {
    return items
      .map((item, idx) => ({
        name: item.name,
        desc: item.desc ?? "",
        github: item.github,
        live: item.live || null,
        image: item.image ?? null,
        video: item.video ?? null,
        media: Array.isArray(item.media) ? item.media : [],
        private: item.private ?? false,
        tech: item.tech ?? null,
        best: !!item.best,
        bestOrder: idx,
        language: item.language ?? null,
        createdAt: item.createdAt ?? null,
        pushedAt: item.pushedAt ?? null,
      }))
      .map((p) => {
        // Merge legacy single image/video fields into media array
        if ((!p.media || p.media.length === 0) && (p.image || p.video)) {
          const m = [];
          if (p.image) m.push({ type: "image", url: p.image });
          if (p.video) m.push({ type: "video", url: p.video });
          return { ...p, media: m };
        }
        return { ...p, media: p.media || [] };
      })
      .filter((p) => !HIDDEN_REPOS.has(String(p.name ?? "").toLowerCase()));
  }, [items]);

  // Pick the projects for the active filter.
  const shown = useMemo(() => {
    const newest = [...pool].sort(
      (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
    );
    if (filter === "recent") {
      return [...pool]
        .sort((a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""))
        .slice(0, SHOW_COUNT);
    }
    if (filter === "oldest") return [...newest].reverse().slice(0, SHOW_COUNT);
    if (filter === "best") {
      const flagged = pool
        .filter((p) => p.best)
        .sort((a, b) => a.bestOrder - b.bestOrder);
      const rest = pool
        .filter((p) => !p.best)
        .sort(
          (a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")
        );
      return [...flagged, ...rest].slice(0, SHOW_COUNT);
    }
    return newest.slice(0, SHOW_COUNT);
  }, [pool, filter]);

  const header = (
    <div className="flex flex-wrap items-center gap-2">
      <label className="relative inline-flex items-center gap-2">
        <span className="font-pixel text-[0.55rem] uppercase tracking-[0.14em] text-[var(--muted)]">
          Sort:
        </span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Project filter"
          className="font-pixel text-[0.6rem] uppercase tracking-[0.08em] appearance-none bg-[var(--bg3)] text-[var(--text)] border-2 border-[#000] px-3 py-1.5 pr-8 cursor-pointer shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.3)] focus:outline-none focus:border-[var(--accent2)] transition-colors"
        >
          {FILTERS.map((f) => (
            <option key={f.id} value={f.id} className="bg-[var(--bg2)] text-[var(--text)]">
              {f.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[var(--accent2)] text-[0.6rem] leading-none">
          ▼
        </span>
      </label>
    </div>
  );

  return (
    <Section id="projects" title="Projects" header={header}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8 items-start">
        {shown.map((p, idx) => {
          // Build tech chips from admin-provided tech array.
          const manualTech = Array.isArray(p.tech)
            ? p.tech.map((t) => (typeof t === "string" ? { name: t } : t)).filter((t) => t?.name)
            : [];
          const chips = manualTech.map((t) => ({
            name: t.name,
            icon: t.icon || null,
            tone: t.tone || "tech",
          }));

          const date =
            filter === "recent" && p.pushedAt
              ? { label: "Updated", date: fmtDate(p.pushedAt) }
              : p.createdAt
                ? { label: "Created", date: fmtDate(p.createdAt) }
                : null;

          return (
            <Reveal key={p.name} delay={idx * 90}>
              <article className="pixel-border bg-[var(--card)] p-3 sm:p-3.5 flex flex-col gap-2.5 transition-all duration-300 hover:-translate-y-1">
                <Decrypt
                  text={p.name}
                  as="h3"
                  className="text-[var(--text)] text-base md:text-lg leading-snug min-w-0 flex-text-left"
                />

                {date && (
                  <div className="font-pixel text-[0.65rem] uppercase tracking-[0.1em]">
                    <span className="text-[var(--accent2)]">{date.label}</span>{" "}
                    <span className="text-[var(--text)]">{date.date}</span>
                  </div>
                )}

                {chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {chips.map((c, ci) => (
                      <TechChip key={`${c.tone}-${c.name}-${ci}`} name={c.name} tone={c.tone} icon={c.icon} />
                    ))}
                  </div>
                )}

                {p.media.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMediaGallery({ open: true, items: p.media, index: 0 })}
                    className="flex items-center gap-2 px-3 py-2 rounded-md border-2 border-[#000] bg-[var(--bg3)] text-[var(--accent2)] font-pixel text-[0.6rem] uppercase tracking-[0.1em] hover:bg-[var(--accent2)] hover:text-[#000] transition-colors cursor-pointer shadow-[inset_2px_2px_0_rgba(255,255,255,0.08),inset_-2px_-2px_0_rgba(0,0,0,0.3)] w-full justify-center"
                  >
                    ▶ Media ({p.media.length})
                  </button>
                )}

                {p.desc && (
                  <Decrypt
                    text={p.desc}
                    as="p"
                    className="text-sm md:text-[0.95rem] text-left text-[var(--text)] opacity-90 leading-relaxed flex-text-left"
                  />
                )}

                <div className="flex flex-wrap gap-2 pt-3 border-t border-[var(--border)]">
                  {!p.private && <ProjectLink href={p.github}>GitHub →</ProjectLink>}
                  {p.live && <ProjectLink href={p.live}>▶ Play</ProjectLink>}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <div className="text-center">
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn px-6 py-3"
        >
          <Decrypt text="View more on GitHub →" />
        </a>
      </div>

      {/* Media Gallery Popup */}
      {mediaGallery.open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setMediaGallery({ ...mediaGallery, open: false })}
        >
          <div
            className="relative max-w-3xl w-full flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setMediaGallery({ ...mediaGallery, open: false })}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-[var(--bg2)] border-2 border-[#000] text-[var(--text)] flex items-center justify-center font-pixel text-xs hover:bg-red-500/20 hover:text-red-400 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Left arrow */}
            {mediaGallery.items.length > 1 && (
              <button
                type="button"
                onClick={() => setMediaGallery({
                  ...mediaGallery,
                  index: (mediaGallery.index - 1 + mediaGallery.items.length) % mediaGallery.items.length,
                })}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--bg2)] border-2 border-[#000] text-[var(--accent2)] flex items-center justify-center font-pixel text-lg hover:bg-[var(--accent2)] hover:text-[#000] transition-colors cursor-pointer shadow-lg"
              >
                ◀
              </button>
            )}

            {/* Media content */}
            <div className="rounded-lg overflow-hidden border-2 border-[#000] bg-[var(--bg3)] max-h-[70vh] flex items-center justify-center">
              {mediaGallery.items[mediaGallery.index]?.type === "video" ? (
                <video
                  src={mediaGallery.items[mediaGallery.index].url}
                  controls
                  autoPlay
                  className="max-h-[70vh] max-w-full object-contain"
                />
              ) : (
                <img
                  src={mediaGallery.items[mediaGallery.index]?.url}
                  alt=""
                  className="max-h-[70vh] max-w-full object-contain"
                />
              )}
            </div>

            {/* Right arrow */}
            {mediaGallery.items.length > 1 && (
              <button
                type="button"
                onClick={() => setMediaGallery({
                  ...mediaGallery,
                  index: (mediaGallery.index + 1) % mediaGallery.items.length,
                })}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[var(--bg2)] border-2 border-[#000] text-[var(--accent2)] flex items-center justify-center font-pixel text-lg hover:bg-[var(--accent2)] hover:text-[#000] transition-colors cursor-pointer shadow-lg"
              >
                ▶
              </button>
            )}

            {/* Counter dots */}
            {mediaGallery.items.length > 1 && (
              <div className="flex gap-2 mt-1">
                {mediaGallery.items.map((_, di) => (
                  <button
                    key={di}
                    type="button"
                    onClick={() => setMediaGallery({ ...mediaGallery, index: di })}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      di === mediaGallery.index
                        ? "bg-[var(--accent2)]"
                        : "bg-[var(--muted)] opacity-40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
