import React from "react";
import TopBar from "@/components/TopBar";
import Link from "next/link";
import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";

const Profil = () => {
  return (
    <>
      <TopBar />
      <main className="flex flex-col gap-7 px-5 pb-40">
        <h1 className="text-3xl font-bold text-orange">{`Bonjour {Prénom} !`}</h1>
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Créations</h2>
          <div className="flex flex-col gap-3">
            <Button type="button" className="w-fit">
              <Link className="flex" href="/profil/parcours">
                <h3>Mes parcours</h3>
                <Icons.arrowLink className="ml-2" />
              </Link>
            </Button>
            <Button type="button" className="w-fit">
              <Link className="flex" href="/profil/evenements">
                <h3>Mes évènements</h3>
                <Icons.arrowLink className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>
        <section className="flex flex-col rounded-lg bg-gray px-5 py-4">
          <Link href="/" className="flex h-8 items-center gap-5 text-sm">
            <div className="flex size-5 items-center justify-center">
              <Icons.questionMark fill="#CEC0AD" />
            </div>
            <span className="font-semibold">Signaler un problème</span>
          </Link>
          <Link href="/" className="flex h-8 items-center gap-5 text-sm">
            <div className="flex size-5 items-center justify-center">
              <Icons.file fill="#CEC0AD" />
            </div>
            <span className="font-semibold">
              Conditions générales d’utilisation
            </span>
          </Link>
          <Link href="/" className="flex h-8 items-center gap-5 text-sm">
            <div className="flex size-5 items-center justify-center">
              <Icons.eye fill="#CEC0AD" />
            </div>
            <span className="font-semibold">Politique de confidentialité</span>
          </Link>
          <Link href="/" className="flex h-8 items-center gap-5 text-sm">
            <div className="flex size-5 items-center justify-center">
              <Icons.legals fill="#CEC0AD" />
            </div>
            <span className="font-semibold">Mentions légales</span>
          </Link>
        </section>
        <Button isSignOut variant="danger">
          Déconnexion
        </Button>
        <Button variant="dangerFilled">Supprimer mon compte</Button>
      </main>
    </>
  );
};

export default Profil;
