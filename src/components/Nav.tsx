"use client";
import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";

const Nav = () => {
  const currentPath = usePathname();
  const isMainPage = currentPath === "/" || currentPath === "";
  return (
    <nav className="fixed inset-x-5 bottom-5 flex items-end justify-center rounded-xl border-2 border-orange bg-background p-2 sm:hidden">
      <Link
        href="/parcours"
        className={`flex h-12 flex-1 flex-col items-center justify-center text-[14px] font-bold ${currentPath.includes("/parcours") ? "text-orange" : "text-gray-200"}`}
      >
        <Icons.flag
          width={40}
          height={40}
          className="size-[40px]"
          fill={
            currentPath.includes("/parcours")
              ? "var(--orange)"
              : "var(--light-gray)"
          }
        />
        Parcours
      </Link>
      <Link
        href="/"
        className={`flex h-12 flex-1 flex-col items-center justify-center text-[14px] font-bold ${isMainPage ? "text-orange" : "text-gray-200"}`}
      >
        <Icons.compass
          className="size-[40px]"
          fill={isMainPage ? "var(--orange)" : "var(--light-gray)"}
        />
        Accueil
      </Link>
      <Link
        href="/evenements"
        className={`flex h-12 flex-1 flex-col items-center justify-center text-[14px] font-bold ${currentPath.includes("/evenements") ? "text-orange" : "text-gray-200"}`}
      >
        <Icons.agenda
          className="size-[28px]"
          fill={
            currentPath.includes("/evenements")
              ? "var(--orange)"
              : "var(--light-gray)"
          }
        />
        Agenda
      </Link>
    </nav>
  );
};

export default Nav;
