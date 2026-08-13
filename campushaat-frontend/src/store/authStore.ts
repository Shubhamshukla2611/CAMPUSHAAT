import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => {
    // Placeholder login action
    console.log('authStore.login called with:', userData);
    set({
      isAuthenticated: true,
      user: {
        id: 'user-1',
        name: userData.fullName || 'Test User',
        email: userData.universityEmail,
        isVerified: true,
      }
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null
    });
  }
}));
