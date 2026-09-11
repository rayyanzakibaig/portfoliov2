import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Lexend, Outfit } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import LenisProvider from "@/components/LenisProvider";
import EasterEgg from "@/components/EasterEgg";
import IntroSplash from "@/components/IntroSplash";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Rayyan Zakibaig — Product Designer & Builder",
  description:
    "Product designer who builds. Crafting products that are intuitive to use and thoughtful to look at.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rayyan Zakibaig — Product Designer & Builder",
    description: "Product designer who builds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${spaceGrotesk.variable} ${lexend.variable} ${outfit.variable} antialiased`}>
        <ThemeProvider>
          <IntroSplash />
          <LenisProvider>
            <Cursor />
            <Nav />
            <EasterEgg />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
