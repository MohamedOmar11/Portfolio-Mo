import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dbConnect from "@/lib/mongodb";
import Content from "@/models/Content";

const inter = Inter({ subsets: ["latin"] });

import { Providers } from "@/components/Providers";

export async function generateMetadata(): Promise<Metadata> {
  try {
    await dbConnect();
    const items = await Content.find({ section: 'seo' }).lean();
    const map = new Map<string, string>();
    for (const it of items as any[]) {
      if (it?.key && typeof it.value === 'string') map.set(it.key, it.value);
    }
    return {
      title: map.get('meta_title') || 'Studio | Portfolio',
      description: map.get('meta_description') || 'Premium branding & graphic design portfolio.',
    };
  } catch {
    return {
      title: 'Studio | Portfolio',
      description: 'Premium branding & graphic design portfolio.',
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
