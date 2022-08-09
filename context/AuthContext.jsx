import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { nanoid } from 'nanoid';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const googleProvider = new GoogleAuthProvider();

  const getOrCreateDocument = async (email) => {
    const docRef = doc(firestore, `users/${email}`);
    const query = await getDoc(docRef);
    if (query.exists()) {
      const data = query.data();
      return data;
    } else {
      setDoc(docRef, {
        orders: [...orders],
      });
      const query = await getDoc(docRef);
      const data = query.data();
      return data;
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setResponse(user);
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

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const response = await getOrCreateDocument(user.email);
  //     setOrders(response);
  //   };
  //   if (user) {
  //     fetchOrders();
  //   }
  // }, []);

  const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logOut = async () => {
    try {
      setUser(null);
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    setOrders([]);
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const getOrCreateDocument = async (email) => {
  //   const docRef = doc(firestore, `users/${email}`);
  //   const query = await getDoc(docRef);
  //   if (query.exists()) {
  //     const data = query.data();
  //     return data;
  //   } else {
  //     setDoc(docRef, {
  //       id: nanoid(),
  //     });
  //     const query = await getDoc(docRef);
  //     const data = query.data();
  //     return data;
  //   }
  // };

  const updateDocument = async (email, data) => {
    const docRef = doc(firestore, `users/${email}`);
    await updateDoc(docRef, {
      orders: [...data],
    });
  };

  return <AuthContext.Provider value={{ user, logIn, signUp, logOut, isLoading, signInWithGoogle, response, getOrCreateDocument, updateDocument, orders, setOrders }}>{children}</AuthContext.Provider>;
};
