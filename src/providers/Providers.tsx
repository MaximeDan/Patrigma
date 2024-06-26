"use client";
import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { SessionProvider } from "next-auth/react";

type ProviderProps = {
  children?: React.ReactNode;
};

export const ReactParallaxProvider = ({ children }: ProviderProps) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};

export const ClientSessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
