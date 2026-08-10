import { readFile } from "node:fs/promises";
import path from "node:path";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Foundation from "./components/Foundation";
import Career from "./components/Career";
import Tech from "./components/Tech";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StartScreen from "./components/StartScreen";
import CosmicBackground from "./components/CosmicBackground";

// Reads the locally-edited admin content when present (app/admin is gitignored
// and local-only), so changes saved in /admin show up in dev and in local
// production builds. Returns null when the file is absent — e.g. git-based
// deploys, where app/admin doesn't exist — so the components fall back to the
// content embedded in them.
async function getLocalContent() {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "app", "admin", "data", "content.json"),
      "utf8"
    );
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function Home() {
  const content = await getLocalContent();
  const profile = content?.profile;
  const tagline = profile?.intro?.split("\n")[0] ?? "Frontend-Focused Full-Stack Developer";
  return (
    <>
      <CosmicBackground />
      <StartScreen brand={profile?.brand ?? "DavidNTD"} tagline={tagline}>
        <Navbar
          brand={profile?.brand ?? "DavidNTD"}
          resumeUrl={profile?.resumeUrl ?? "/Resume/David Nguyen - Resume.pdf"}
        />
        <main className="relative z-10">
          <Intro profile={profile} about={content?.about} />
          <Foundation education={content?.education} awards={content?.awards} />
          <Career items={content?.career} />
          <Tech groups={content?.skills?.groups} />
          <Projects items={content?.projects} />
          <Contact contact={profile} footerText={content?.footer} />
        </main>
      </StartScreen>
    </>
  );
}
