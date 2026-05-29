import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmplifyProvider from "@/components/AmplifyProvider";

export const metadata: Metadata = {
  title: "Rev Sione Kami Memorial Church | RSKMC",
  description:
    "Welcome to Rev Sione Kami Memorial Church (RSKMC) — a vibrant, Christ-centered congregation dedicated to worship, discipleship, and community service.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AmplifyProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AmplifyProvider>
      </body>
    </html>
  );
}
