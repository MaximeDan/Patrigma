import Link from "next/link";

export default function NotFound() {
  return (
    <main className=" container mt-20 px-5 sm:px-8">
      <h2 className="text-2xl font-bold text-orange">
        Erreur 404, page non trouvée
      </h2>
      <p className="mb-4 mt-2">
        Désolé, nous ne trouvons pas la page que vous cherchez.
      </p>
      <Link className="underline" href="/">
        Retour à l'accueil
      </Link>
    </main>
  );
}
