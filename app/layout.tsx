import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gemini Monitor',
  description: 'Company PC monitoring agent by Gemini.',
  openGraph: {
    title: 'Gemini Monitor',
    description: 'Company PC monitoring agent by Gemini.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini Monitor',
    description: 'Company PC monitoring agent by Gemini.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="bg-[#0f0f14] text-zinc-100 font-sans antialiased selection:bg-[#A78BFA]/30 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
