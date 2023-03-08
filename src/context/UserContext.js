import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChangeed
} from "firebase/auth"
import {auth} from "../firebase-config"
export const UserContext = createContext();

export function UserContextProvider(props) {
  
  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
  
  const [currentUser, setCurrentUser] = useState();
  const [loadingDelta, setLoadingDelta] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChangeed(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingDelta(false)
    })

    return unsubscribe;

  }, [])
  
  

  //modal
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false,
  });

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    }
    if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
    }
    if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };

  return (
    <UserContext.Provider value={{ modalState, toggleModals, signUp, currentUser }}>
      {!loadingDelta && props.children}
    </UserContext.Provider>
  );
}
