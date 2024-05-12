import React from "react";
import MobileNav from "@/components/MobileNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <MobileNav />
    </>
  );
}
