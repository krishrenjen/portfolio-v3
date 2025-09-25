import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import StarrySky from "@/components/Visual/StarrySky";
import Navbar from "@/components/Navbar/Navbar";

const inter = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krish Renjen | Portfolio",
  description:
    "Portfolio for Krish Renjen, a web, software, and Java developer.",
  openGraph: {
    title: "Krish Renjen | Portfolio",
    description:
      "Portfolio for Krish Renjen, a web, software, and Java developer.",
    url: "https://yourdomain.com",
    siteName: "Krish Renjen Portfolio",
    images: [
      {
        url: "https://yourdomain.com/path-to-image.jpg",
        width: 1200,
        height: 630,
        alt: "Krish Renjen Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <StarrySky />
          <Navbar />
          {children}
        </>
      </body>
    </html>
  );
}
