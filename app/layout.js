import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'DavidNTD',
  description: 'Software developer portfolio',
  icons: {
    icon: [
      {
        url: '/images/favicon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/favicon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
      { url: '/images/favicon-dark.png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['DM_Mono',monospace] font-medium">{children}</body>
    </html>
  );
}
