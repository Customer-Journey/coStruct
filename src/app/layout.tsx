import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Sans } from "next/font/google";

// import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "coStruct",
  description: "The Internet Coordination Execution Layer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexSans.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
