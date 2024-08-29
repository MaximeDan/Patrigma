"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  const currentPath = usePathname();
  const isMainPage = currentPath === "/" || currentPath === "";
  const { data: session } = useSession();

  return (
    <>
      <header className="container flex items-center px-5 py-3">
        <Link href="/" className="mr-auto">
          <Image
            src="/img/appIcon/Iconarchive-Seaside-Treasure-Map.128.png"
            alt="Site Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
        </Link>
        <nav className="hidden gap-5 sm:flex">
          <Link
            href="/"
            className={`mx-auto flex h-10 flex-1 items-center justify-center font-bold uppercase ${isMainPage ? "text-orange" : "text-foreground"}`}
          >
            COUCOU les loulous
          </Link>
          <Link
            href="/parcours"
            className={`flex h-10 flex-1 items-center justify-center font-bold uppercase ${
              currentPath.includes("/parcours")
                ? "text-orange"
                : "text-foreground"
            }`}
          >
            Parcours
          </Link>

          <Link
            href="/evenements"
            className={`flex h-10 flex-1 items-center justify-center font-bold uppercase ${
              currentPath.includes("/evenements")
                ? "text-orange"
                : "text-foreground"
            }`}
          >
            Évènements
          </Link>
        </nav>
        <div className="ml-7 flex items-center">
          {session ? (
            <>
              <div className="flex flex-col items-center">
                <Link href={`/profil`}>
                  <Image
                    src="/img/min-shadavatar.webp"
                    alt="logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </Link>
                <p className="text-sm">{session.user.name}</p>
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <Button
                variant="default"
                size="sm"
                onClick={() => signIn()}
                className="border-2 border-orange bg-white text-sm font-semibold text-orange"
              >
                Se connecter
              </Button>
              <Link href="/register">
                <Button
                  variant="default"
                  size="sm"
                  className="border-2 border-orange bg-white text-sm font-semibold text-orange"
                >
                  S'enregistrer
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
      <hr className="mb-8 border-2 border-orange-600" />
    </>
  );
};

export default TopBar;
