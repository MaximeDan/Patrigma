import React from "react";
import MobileNav from "@/components/MobileNav";
import { ReactParallaxProvider } from "@/providers/Providers";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactParallaxProvider>
      {children}
      <MobileNav />
    </ReactParallaxProvider>
  );
}
