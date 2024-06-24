"use client";
import React from "react";
import { ParallaxProvider } from "react-scroll-parallax";

type ProviderProps = {
  children?: React.ReactNode;
};

export const ReactParallaxProvider = ({ children }: ProviderProps) => {
  return <ParallaxProvider>{children}</ParallaxProvider>;
};
