import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";

const MobileNav = () => {
  return (
    <nav className="fixed inset-x-5 bottom-5 flex  items-end justify-center rounded-xl bg-background p-2">
      <Link
        href="/parcours"
        className="flex h-10  flex-1 items-center justify-center "
      >
        <Icons.flag className="size-[30px]" fill="var(--light-gray)" />
      </Link>
      <Link
        href="/"
        className="mx-auto flex h-10 flex-1 items-center justify-center "
      >
        <Icons.compass className="size-[34px]" fill="var(--light-gray)" />
      </Link>
      <Link href="/" className="flex h-10 flex-1 items-center justify-center ">
        <Icons.agenda className="size-[28px]" fill="var(--light-gray)" />
      </Link>
    </nav>
  );
};

export default MobileNav;
