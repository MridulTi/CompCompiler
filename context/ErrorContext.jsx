"use client"
import React, { createContext, useContext, useState } from 'react';

// Create a context for error handling
const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [hostModal, setHostingModal] = useState(false);
  const [addChallenge, setAddChallenge] = useState(false);
  const [challenge, setchallenge] = useState(undefined);

  function triggerError(message){
    setError(message.message);
  };

  const closeError = () => {
    setError(null);
  };

  function setHostModal(){
    setHostingModal(!hostModal)
  }
  function setCurrentChallenge(data){
    setchallenge(data)
  }
  function setNewAddChallenge(){
    setAddChallenge(!addChallenge)
  }


  return (
    <ErrorContext.Provider value={{ 
      error, 
      triggerError,
      challenge,
      setCurrentChallenge, 
      closeError, 
      hostModal ,
      setHostModal,
      addChallenge,
      setNewAddChallenge,
    }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
