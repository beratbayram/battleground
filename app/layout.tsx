import type { Metadata } from "next";
import "./globals.scss";
import "./reset.scss";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Battleground.js",
  description: "Assigned position management and tracking system",
};

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
