import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          // user.displayName, user.email, user.uid, user.photoURL
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logOut = async () => {
    try {
      setUser(null);
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return <AuthContext.Provider value={{ user, logIn, signUp, logOut, isLoading }}>{children}</AuthContext.Provider>;
};
