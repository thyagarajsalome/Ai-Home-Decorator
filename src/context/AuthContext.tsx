// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient"; // <-- Import Supabase client

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the initial user session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setCurrentUser(session?.user ?? null);
        setLoading(false);
        console.log(
          "Initial session fetch, user:",
          session?.user ? session.user.id : "null"
        );
      })
      .catch((error) => {
        console.error("Error getting initial session:", error);
        setLoading(false);
      });

    // Listen for authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      console.log(
        "Auth state changed, user:",
        session?.user ? session.user.id : "null"
      );
    });

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const getIdToken = async (): Promise<string | null> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting session token:", error);
      return null;
    }

    if (!session) {
      console.log("getIdToken: No current session.");
      return null;
    }

    return session.access_token;
  };

  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
      // Handle sign-out errors if necessary
    }
    // currentUser state will be updated by onAuthStateChange
  };

  const value = {
    currentUser,
    loading,
    getIdToken,
    signOut,
  };

  // Don't render children until loading is false
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
