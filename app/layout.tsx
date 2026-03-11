import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rayyan Zakibaig — Product Designer & Builder",
  description:
    "Product designer who builds. Crafting products that are intuitive to use and thoughtful to look at.",
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
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        <ThemeProvider>
          <Cursor />
          <Nav />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
