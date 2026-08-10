import { getContent } from "./admin/lib/content";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Foundation from "./components/Foundation";
import Career from "./components/Career";
import Tech from "./components/Tech";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import VisitTracker from "./admin/components/VisitTracker";
import StartScreen from "./components/StartScreen";
import CosmicBackground from "./components/CosmicBackground";

export default async function Home() {
  const content = await getContent();
  const tagline = content.profile.intro.split("\n")[0];
  return (
    <>
      <VisitTracker />
      <CosmicBackground />
      <StartScreen brand={content.profile.brand} tagline={tagline}>
        <Navbar brand={content.profile.brand} resumeUrl={content.profile.resumeUrl} />

        <main className="relative z-10">
          <Intro profile={content.profile} about={content.about} />
          <Foundation education={content.education} awards={content.awards} />
          <Career items={content.career} />
          <Tech groups={content.skills.groups} />
          <Projects items={content.projects} />
          <Contact contact={content.profile} footerText={content.footer} />
        </main>
      </StartScreen>
    </>
  );
}
