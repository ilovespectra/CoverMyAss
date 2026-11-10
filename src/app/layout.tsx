import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cover-my-ass.vercel.app"),
  title: "Cover My Ass - Make Real Photos Look Fake",
  description: "Add Gemini watermarks to your photos and make them look AI-generated. Simple, fast, and free.",
  openGraph: {
    title: "Cover My Ass",
    description: "Making Real Photos Look Fake",
    url: "/",
    siteName: "Cover My Ass",
    images: [
      {
        url: "/cover-my-ass-card.png",
        width: 1200,
        height: 630,
        alt: "Cover My Ass social preview with the Jeff face and AI watermark",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cover My Ass",
    description: "Making Real Photos Look Fake",
    images: [
      {
        url: "/cover-my-ass-card.png",
        width: 1200,
        height: 630,
        alt: "Cover My Ass social preview with the Jeff face and AI watermark",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
