import Link from "next/link";
import React from "react";
import { Icons } from "./Icons";

const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 flex w-full items-end justify-center bg-gray-400 px-6 py-2">
      <Link href="/" className="flex flex-col items-center">
        <Icons.flag className="size-[27px]" />
        <p>Parcours</p>
      </Link>
      <Link href="/" className="mx-auto flex flex-col items-center">
        <Icons.compass className="size-[31px]" />
        <p>Accueil</p>
      </Link>
      <Link href="/" className="flex flex-col items-center">
        <Icons.agenda className="size-[25px]" />
        <p>Évènement</p>
      </Link>
    </nav>
  );
};

export default MobileNav;
