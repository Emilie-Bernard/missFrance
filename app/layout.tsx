import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Miss France",
  description: "Application d'aide à la sélection de Miss France",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col items-center min-h-screen pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <Link href="/">
          <Image src="/icon.png" alt="Miss France logo" width={180} height={38} />
        </Link>
        {children}
      </body>
    </html>
  );
}
