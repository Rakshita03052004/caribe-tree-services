import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caribe Tree Services · Kissimmee, FL",
  description: "Tree removal, trimming, stump grinding and storm cleanup in Kissimmee and Central Florida. English & Español.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
