import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";
import LenisProvider from "@/components/LenisProvider";
import EasterEgg from "@/components/EasterEgg";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
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
      <body className={`${GeistSans.variable} ${cormorant.variable} antialiased`}>
        <ThemeProvider>
          <LenisProvider>
            <Cursor />
            <Nav />
            <EasterEgg />
            <PageTransition>{children}</PageTransition>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
