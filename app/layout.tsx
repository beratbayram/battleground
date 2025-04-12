import { BtLocalizationProvider } from "@/lib/components/BtLocalizationProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.scss";
import "./reset.scss";

export const metadata: Metadata = {
  title: "Battleground.js",
  description: "Assigned position management and tracking system",
};

interface Props {
  children: ReactNode;
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="tr">
      <CssBaseline />
      <BtLocalizationProvider>
        <body>{children}</body>
      </BtLocalizationProvider>
    </html>
  );
}
