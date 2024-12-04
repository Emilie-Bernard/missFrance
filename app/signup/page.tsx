"use client";

import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "../store/userStore";
import { redirect, useRouter } from "next/navigation";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUserStore();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch('/api/signup-user', {
      method: 'POST',
      body: JSON.stringify({ email, firstName, lastName, password }),
    });
    console.log(response);
    const data = await response.json();
    if (data.error) {
      setError(data.error);
    }
    if (data.id) {
      setUser(data);
      setLoading(false);
      return router.push('/miss');
    } 
    setLoading(false);
  };

  return (
    <aside className="flex items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p className="text-red-500">{error}</p>
        <input 
          className="border border-gray-300 rounded-md p-2 bg-gray-300 text-black"
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        className="border border-gray-300 rounded-md p-2 bg-gray-300 text-black"
          type="text" 
          placeholder="Prénom" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input 
          className="border border-gray-300 rounded-md p-2 bg-gray-300 text-black"
          type="text" 
          placeholder="Nom de famille" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)}
        />
        <input 
          className="border border-gray-300 rounded-md p-2 bg-gray-300 text-black"
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          className="border border-gray-300 rounded-md p-2 bg-gray-300 text-black"
          type="password" 
          placeholder="Confirmer le mot de passe" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button disabled={loading} type="submit" className="bg-gold text-white px-4 py-2 rounded-md hover:bg-gold/80">{loading ? "Création du compte..." : "Créer un compte"}</button>
        <div>Déjà un compte ? <Link href="/login" className="text-gold font-bold">Se connecter</Link></div>
      </form>
    </aside>
  );
};

export default SignupPage;
