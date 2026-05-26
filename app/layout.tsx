import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
import "../src/index.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: {
    default: "Shaily Verma Art Studio | Original Paintings & Online Art Classes",
    template: "%s | Shaily Verma Art Studio"
  },
  description: "Buy original handmade canvas paintings online — devotional, portrait & custom art. Join online drawing & painting classes by Shaily Verma. Based in New Delhi, India.",
  keywords: ["buy canvas painting online India", "custom portrait painting", "online art classes India", "acrylic painting classes", "handmade painting gift"],
  openGraph: {
    title: "Shaily Verma Art Studio",
    description: "Original paintings & online art classes by Shaily Verma.",
    url: "https://artistshaily.com",
    siteName: "Shaily Verma Art Studio",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

