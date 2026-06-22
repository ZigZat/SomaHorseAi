import type { Metadata } from "next";
import { Raleway, Space_Grotesk } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});
 
export const metadata: Metadata = {
  title: "Somahorse.ai — AI infrastructure for African agriculture",
  description:
    "Describe your agricultural problem in plain language. Somahorse.ai scopes it, prices it, assembles a certified team, builds it, and keeps it running.",
};
 
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
   <html lang="en" className={`${raleway.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}      