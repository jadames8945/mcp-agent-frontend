import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setLoading: (loading: boolean) => void;
  
  login: (user: User, token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isHydrated: false,
  
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  login: (user, token) => {
    set({ 
      user, 
      token, 
      isAuthenticated: true,
      isLoading: false 
    });
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('mcp_token', token);
      localStorage.setItem('mcp_user', JSON.stringify(user));
    }
  },
  
  logout: () => {
    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false,
      isLoading: false 
    });
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mcp_token');
      localStorage.removeItem('mcp_user');
    }
  },
  
  initializeAuth: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('mcp_token');
      const userStr = localStorage.getItem('mcp_user');
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          set({ 
            user, 
            token, 
            isAuthenticated: true,
            isHydrated: true 
          });
        } catch (error) {
          console.error('Failed to parse stored user:', error);
          set({ isHydrated: true });
        }
      } else {
        set({ isHydrated: true });
      }
    }
  },
})); 