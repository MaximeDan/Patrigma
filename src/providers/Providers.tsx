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

interface AuthProviderProps {
  children: React.ReactNode;
  session: any;
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
