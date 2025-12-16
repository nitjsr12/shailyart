import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "../src/index.css";

export const metadata: Metadata = {
  title: "Shaily Verma Art Studio",
  description: "Art studio offering paintings, classes, and custom artwork",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

