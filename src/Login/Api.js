import React, { createContext, useContext, useState } from 'react';

// Create the Auth context
const AuthContext = createContext();

// AuthProvider to wrap the application or parts that need access to authentication
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search,setSearch] = useState('');
  // Provide both isLoggedIn and isAdmin states in a single object
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin ,search,setSearch}}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook to access Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
