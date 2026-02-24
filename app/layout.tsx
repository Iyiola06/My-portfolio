import type {Metadata} from 'next';
import {Inter, JetBrains_Mono} from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Iyiola Ogunjobi - Senior Full Stack Developer',
  description: 'Portfolio of Iyiola Ogunjobi, a Senior Full Stack Developer specializing in scalable web systems.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}>
      <body className="bg-[#0A0A0A] text-slate-200 min-h-screen selection:bg-[#d39e17] selection:text-black">
        {children}
      </body>
    </html>
  );
}
