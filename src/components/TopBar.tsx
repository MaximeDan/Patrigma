"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopBar = () => {
  const currentPath = usePathname();
  const isMainPage = currentPath === "/" || currentPath === "";
  // todo: retrieve user data from session and display its name and profile picture
  return (
    <>
      <header className="container flex items-center px-5 py-3">
        <div className="mr-auto size-14 rounded-full bg-slate-300"></div>
        <nav className="hidden gap-5 sm:flex">
          <Link
            href="/"
            className={`mx-auto flex h-10 flex-1 items-center justify-center font-semibold uppercase ${isMainPage ? "text-orange" : "text-foreground"} `}
          >
            Accueil
          </Link>
          <Link
            href="/parcours"
            className={`flex h-10 flex-1 items-center justify-center font-semibold uppercase ${
              currentPath.includes("/parcours")
                ? "text-orange"
                : "text-foreground"
            }`}
          >
            Parcours
          </Link>

          <Link
            href="/evenements"
            className={`flex h-10 flex-1 items-center justify-center font-semibold uppercase ${
              currentPath.includes("/evenements")
                ? "text-orange"
                : "text-foreground"
            }`}
          >
            Évènements
          </Link>
        </nav>
        <Link className="ml-7 flex flex-col items-center" href="/profil">
          <Image
            src="/img/min-shadavatar.webp"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-sm">Profil</p>
        </Link>
      </header>
      <hr className="mb-8 border-beige" />
    </>
  );
};

export default TopBar;
