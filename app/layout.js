import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import FaviconTheme from "./components/FaviconTheme";
import { getContent } from "./admin/lib/content";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin", "vietnamese"],
  variable: "--font-crt",
});


export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata() {
  const content = await getContent();
  return {
    title: content.profile.brand,
    description: content.profile.intro,
    icons: {
      icon: {
        url: "/images/favicon-light.png?v=6",
        type: "image/png",
        sizes: "512x512",
      },
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${pressStart.variable} ${vt323.variable}`}>
        <FaviconTheme />
        {children}
      </body>
    </html>
  );
}
