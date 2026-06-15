// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient";

interface AuthContextType {
  currentUser: User | null;
  currentUserRole: string;
  credits: number;
  loading: boolean;
  isAppMode: boolean; // <--- IMPORTANT: Tells the app if it's in TWA/PWA mode
  getIdToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshCredits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string>("user");
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isAppMode, setIsAppMode] = useState(false); // <--- STATE

  const fetchUserData = async (user: User | null) => {
    if (!user) {
      setCurrentUserRole("user");
      setCredits(0);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("role, generation_credits")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setCurrentUserRole(data?.role || "user");
      setCredits(data?.generation_credits || 0);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setCurrentUserRole("user");
      setCredits(0);
    }
  };

  const refreshCredits = async () => {
    if (!currentUser) return;
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("generation_credits")
        .eq("id", currentUser.id)
        .single();
      if (error) throw error;
      if (data) {
        setCredits(data.generation_credits);
      }
    } catch (error) {
      console.error("Error refreshing credits:", error);
    }
  };

  useEffect(() => {
    // --- DETECT APP MODE ---
    // 1. Check for TWA specific referrer (Android)
    const isTWA = document.referrer.includes("android-app://");
    // 2. Check for Standalone mode (PWA/Installed)
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    // If either is true, we are running as an installed app
    setIsAppMode(isTWA || isStandalone);
    // -----------------------

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      await fetchUserData(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      await fetchUserData(user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const getIdToken = async (): Promise<string | null> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) return null;
    return session.access_token;
  };

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
  };

  const value = {
    currentUser,
    currentUserRole,
    credits,
    loading,
    isAppMode, // <--- EXPOSED
    getIdToken,
    signOut,
    refreshCredits,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
