import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

// Create the AuthContext object
export const AuthContext = createContext({
  currentUser: null,
  signup: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  resetPassword: () => Promise.resolve(),
  updateEmail: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
});

// Create and export the AuthProvider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define the signup function
  async function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function logout() {
    return auth.signOut();
  }

  async function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  async function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  async function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  // Set up the useEffect hook to listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Define the value of the context provider
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  // Render the AuthContext.Provider with the value and children
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
