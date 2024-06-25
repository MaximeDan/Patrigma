import React from "react";
import Nav from "@/components/Nav";
import { ReactParallaxProvider } from "@/providers/Providers";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactParallaxProvider>
      {children}
      <Nav />
    </ReactParallaxProvider>
  );
}
