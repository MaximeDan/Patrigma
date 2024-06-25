import React from "react";
import Nav from "@/components/Nav";
import { ReactParallaxProvider } from "@/providers/Providers";
import EventForm from "@/components/form/event/EventForm";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactParallaxProvider>
      {children}
      <EventForm />
      <Nav />
    </ReactParallaxProvider>
  );
}
