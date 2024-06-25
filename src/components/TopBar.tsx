import React from "react";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
  // todo: retrieve user data from session and display its name and profile picture
  return (
    <>
      <header className="flex items-center justify-between px-5 py-3">
        <div className="size-14 rounded-full bg-slate-300"></div>
        <Link className="flex flex-col items-center" href="/profil">
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
