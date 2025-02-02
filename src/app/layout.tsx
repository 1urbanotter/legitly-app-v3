// src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from '@/providers/Providers';
import Navbar from '@/components/common/Navbar';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-roboto',
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    default: "Legitly - AI-Powered Legal Assistant",
    template: "%s | Legitly"
  },
  description: "Your AI-powered legal assistant that helps analyze cases and provide actionable legal insights",
  keywords: ["legal tech", "AI legal assistant", "legal advice", "law technology"],
  authors: [{ name: "Legitly Founder Paul Barclay" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#ffffff"
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="min-h-screen flex flex-col bg-supreme_white">
        <Providers>
          <header>
            <Navbar />
          </header>
          <main className="flex-grow">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}