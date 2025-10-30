// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth } from "../firebase"; // Assuming firebase.ts exports 'auth'

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
    if (!auth) {
      console.error("Firebase auth is not initialized.");
      setLoading(false);
      return;
    }
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
        console.log("Auth state changed, user:", user ? user.uid : "null");
      },
      (error) => {
        console.error("Auth state listener error:", error);
        setCurrentUser(null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const getIdToken = async (): Promise<string | null> => {
    if (!currentUser) {
      console.log("getIdToken: No current user.");
      return null;
    }
    try {
      // Force refresh? Set to true if needed, depends on token expiry handling
      const token = await currentUser.getIdToken(false);
      return token;
    } catch (error) {
      console.error("Error getting ID token:", error);
      return null;
    }
  };

  const signOut = async (): Promise<void> => {
    if (!auth) {
      console.error("Firebase auth is not initialized.");
      return;
    }
    try {
      await firebaseSignOut(auth);
      // currentUser state will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle sign-out errors if necessary
    }
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
