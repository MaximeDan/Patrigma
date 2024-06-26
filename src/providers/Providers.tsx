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

export const NextAuthProvider = ({ children }: ProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
