"use client";
import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";
import { usePathname } from "next/navigation";

const Nav = () => {
  const currentPath = usePathname();
  const isMainPage = currentPath === "/" || currentPath === "";
  return (
    <nav className="fixed inset-x-5 bottom-5 flex  items-end justify-center rounded-xl border-2 border-orange bg-background p-2 sm:hidden">
      <Link
        href="/parcours"
        className="flex h-10  flex-1 items-center justify-center "
      >
        <Icons.flag
          className="size-[30px]"
          fill={
            currentPath.includes("/parcours")
              ? "var(--orange)"
              : "var(--light-gray)"
          }
        />
      </Link>
      <Link
        href="/"
        className="mx-auto flex h-10 flex-1 items-center justify-center "
      >
        <Icons.compass
          className="size-[34px]"
          fill={isMainPage ? "var(--orange)" : "var(--light-gray)"}
        />
      </Link>
      <Link
        href="/evenements"
        className="flex h-10 flex-1 items-center justify-center "
      >
        <Icons.agenda
          className="size-[28px]"
          fill={
            currentPath.includes("/evenements")
              ? "var(--orange)"
              : "var(--light-gray)"
          }
        />
      </Link>
    </nav>
  );
};

export default Nav;
