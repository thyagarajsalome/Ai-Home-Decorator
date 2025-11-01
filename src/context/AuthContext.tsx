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
  currentUserRole: string; // <-- ADD THIS
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
  const [currentUserRole, setCurrentUserRole] = useState<string>("user"); // <-- ADD THIS
  const [loading, setLoading] = useState(true);

  // --- HELPER FUNCTION TO FETCH ROLE ---
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
      setCurrentUserRole("user"); // Default to 'user' on error
    }
  };

  useEffect(() => {
    // Get the initial user session
    supabase.auth
      .getSession()
      .then(async ({ data: { session } }) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        await fetchUserRole(user); // <-- FETCH ROLE
        setLoading(false);
        console.log("Initial session fetch, user:", user ? user.id : "null");
      })
      .catch((error) => {
        console.error("Error getting initial session:", error);
        setLoading(false);
      });

    // Listen for authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      setCurrentUser(user);
      await fetchUserRole(user); // <-- FETCH ROLE
      console.log("Auth state changed, user:", user ? user.id : "null");
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
    // currentUser and currentUserRole will be updated by onAuthStateChange
  };

  const value = {
    currentUser,
    currentUserRole, // <-- ADD THIS
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
