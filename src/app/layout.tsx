import type {Metadata} from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n-context';

export const metadata: Metadata = {
  title: 'PathMind Pro | Premium LMS Experience',
  description: 'Next-generation assessment and action planning module.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen selection:bg-primary/20">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
