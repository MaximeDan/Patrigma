import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import "./globals.css";
import { ClientSessionProvider } from "@/providers/Providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = "Patrigma";
const APP_DEFAULT_TITLE = "Patrigma";
const APP_TITLE_TEMPLATE = "%s - Patrigma";
const APP_DESCRIPTION = "Découvre ton patrimoine en jouant !";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="fr">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://tarteaucitron.io/load.js?domain=patrigma.code-with-alex.com&uuid=549002fcffff1a72b5c2709ab424dc378cc745e7"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ClientSessionProvider session={session}>
          {children}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
