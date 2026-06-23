import './globals.css';
import FaviconTheme from './components/FaviconTheme';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'DavidNTD',
  description: 'Software developer portfolio',
  icons: {
    icon: { url: '/images/favicon-light.png', type: 'image/png', sizes: '32x32' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var l=document.querySelector('link[data-favicon-theme]')||document.createElement('link');l.rel='icon';l.type='image/png';l.sizes='32x32';l.setAttribute('data-favicon-theme','true');l.href=d?'/images/favicon-dark.png':'/images/favicon-light.png';if(!l.parentNode)document.head.appendChild(l);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-['DM_Mono',monospace] font-medium">
        <FaviconTheme />
        {children}</body>
    </html>
  );
}
