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
  loading: boolean;
  isAppMode: boolean; // <--- IMPORTANT: Tells the app if it's in TWA mode
  getIdToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [isAppMode, setIsAppMode] = useState(false); // <--- STATE

  const fetchUserRole = async (user: User | null) => {
    if (!user) {
      setCurrentUserRole("user");
      return;
    }
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setCurrentUserRole(data?.role || "user");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setCurrentUserRole("user");
    }
  };

  useEffect(() => {
    // --- DETECT APP MODE ---
    const isTWA = document.referrer.includes("android-app://");
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    // If either is true, we are running as an installed app
    setIsAppMode(isTWA || isStandalone);
    // -----------------------

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      await fetchUserRole(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      await fetchUserRole(user);
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
    loading,
    isAppMode, // <--- EXPOSED
    getIdToken,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
