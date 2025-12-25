import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { ErrorSuppress } from "./error-suppress";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dream Journal - Encrypted Dream Journal",
  description: "Privacy-preserving dream journal using FHE encryption",
  icons: {
    icon: "/logo.svg", // Use logo.svg as icon
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dream-bg text-foreground antialiased min-h-screen`}>
        <Script
          src="/suppress-fetch-error.js"
          strategy="beforeInteractive"
        />
        <div className="stars-container">
          {/* 这里可以添加简单的 CSS 星光效果 */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        </div>
        <main className="flex flex-col max-w-screen-lg mx-auto pb-20 px-4 md:px-6">
          <nav className="flex w-full py-12 justify-between items-center">
            <div className="flex items-center gap-5 group cursor-default">
              <div className="relative">
                <div className="absolute -inset-1 bg-purple-500 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-700"></div>
                <Image
                  src="/logo.svg"
                  alt="Dream Journal Logo"
                  width={72}
                  height={72}
                  className="relative rounded-full border-2 border-purple-400/20"
                  priority
                  unoptimized
                />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter text-white text-glow">
                Dream Journal
              </h1>
            </div>
          </nav>
          <ErrorSuppress />
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

