import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/SiteHeader"; // <--- IMPORT THIS
import SiteFooter from "./components/SiteFooter"; // <--- IMPORT THIS

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chicho - Premium Car Rental Georgia",
  description: "Rent luxury cars in Tbilisi and Batumi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} bg-[#0f172a] text-white antialiased`}>
        {/* 1. GLOBAL HEADER (Must be here!) */}
        <SiteHeader />
        
        {/* 2. Page Content (Padded so it doesn't hide behind header) */}
        <main className="pt-16 min-h-screen">
            {children}
        </main>

        {/* 3. GLOBAL FOOTER */}
        <SiteFooter />
      </body>
    </html>
  );
}