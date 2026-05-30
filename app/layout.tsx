import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AmplifyProvider from "@/components/AmplifyProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Rev Sione Kami Memorial Church | RSKMC",
  description:
    "Welcome to Rev Sione Kami Memorial Church (RSKMC) — a vibrant, Christ-centered congregation dedicated to worship, discipleship, and community service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AmplifyProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AmplifyProvider>
      </body>
    </html>
  );
}
