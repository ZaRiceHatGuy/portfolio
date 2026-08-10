import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import Foundation from "./components/Foundation";
import Career from "./components/Career";
import Tech from "./components/Tech";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StartScreen from "./components/StartScreen";
import CosmicBackground from "./components/CosmicBackground";export default async function Home() {
  return (
    <>
      <CosmicBackground />
      <StartScreen brand="DavidNTD" tagline="Frontend-Focused Full-Stack Developer">
        <Navbar brand="DavidNTD" resumeUrl="/Resume/David Nguyen - Resume.pdf" />
        <main className="relative z-10">
          <Intro />
          <Foundation />
          <Career />
          <Tech />
          <Projects />
          <Contact />
        </main>
      </StartScreen>
    </>
  );
}
