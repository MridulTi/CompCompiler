"use client"
import React, { createContext, useContext, useState } from 'react';

// Create a context for error handling
const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState("");
  function triggerError(message){
    setError(message.message);
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, triggerError, closeError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
