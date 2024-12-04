import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "./store/userStore";

export default function Home() {
  const { user } = useUserStore();
  const router = useRouter();

  if (user) {
    return router.push('/miss');
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
