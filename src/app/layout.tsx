import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import "../../public/globals.css";

const geistSans = Noto_Sans_KR({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Noto_Sans_KR({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gmanio | Application",
  description: "There’s no fruit that you can get without time and effort.",
  keywords: ["gmanio", "application", "frontend", "backend"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Gmanio | Application",
    description: "There’s no fruit that you can get without time and effort.",
    url: "https://gman.io",
    siteName: "Gmanio",
    images: [
      {
        url: "https://gmanio.github.io/favicon/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Gmanio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gmanio | Application",
    description: "There’s no fruit that you can get without time and effort.",
    images: ["https://gmanio.github.io/favicon/apple-touch-icon.png"],
  },
};

const GOOGLE_ANALYTICS = "G-J3SVSHNDTE";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId={GOOGLE_ANALYTICS} />
      </body>
    </html>
  );
}
