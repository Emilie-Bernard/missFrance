import { create } from 'zustand';
import { User } from '@prisma/client';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => {
  // Récupérer l'utilisateur du localStorage lors de l'initialisation
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    setUser: (user) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user)); // Sauvegarder l'utilisateur dans localStorage
      }
      set({ user });
    },
    clearUser: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user'); // Effacer l'utilisateur du localStorage
      }
      set({ user: null });
    },
  };
});