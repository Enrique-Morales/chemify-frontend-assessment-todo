import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootStyleRegistry from "./emotion";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO App",
  description: "Enrique Morales' frontend assesment for Chemify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
