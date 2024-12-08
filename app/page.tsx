'use client'
import Link from "next/link";
import { useUserStore } from "./store/userStore";

export default function Home() {
  const { user } = useUserStore();

  if (user) {
    return (<div className="">
      <main className="flex flex-col gap-4 row-start-2 items-center">
        <Link href="/miss" className="w-full">
          <button className="w-full bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80">
            Voir la liste des miss
          </button>
        </Link>
        <Link href="/test" className="w-full">
          <button className="w-full bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80">
            Faire le test
          </button>
        </Link>
        <Link href="/ranking" className="w-full">
          <button className="w-full bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80">
            Voir le classement du test
          </button>
        </Link>
      </main>
    </div>)
  }

  return (
    <div className="">
      <main className="flex flex-col gap-4 row-start-2 items-center">
        <Link href="/signup" className="w-full">
          <button className="w-full bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80">
            Créer un compte
          </button>
        </Link>
        <Link href="/login" className="w-full">
          <button className="w-full bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80">
            Se connecter
          </button>
        </Link>
      </main>
    </div>
  );
}
