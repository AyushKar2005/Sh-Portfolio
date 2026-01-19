// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "../context/AudioProvider";

export const metadata: Metadata = {
  title: "Shruti.AI",
  description: "Premium portfolio of a Machine Learning Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
