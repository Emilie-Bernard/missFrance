"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "../store/userStore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const response = await fetch('/api/login-user', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    }
    else if (data.id) {
      setUser(data);
      setLoading(false);
      return router.push('/miss');  
    }
    setLoading(false);
  };

  return (
    <aside className="flex items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <input 
        className="border border-gray-300 rounded-md p-2 bg-gray-300 text-black"
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        className="border border-gray-300 rounded-md p-2 bg-gray-300 text-black"
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} type="submit" className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80">{loading ? "Connexion..." : "Se connecter"}</button>
        <div>Pas de compte ? <Link href="/signup" className="text-gold font-bold">S'inscrire</Link></div>
      </form>
    </aside>
  );
};

export default LoginPage;
