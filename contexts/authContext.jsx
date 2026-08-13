import { useState, useEffect, createContext } from "react";
import { auth } from "@/firebase/firebaseConfig"
import { signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged, 
  GoogleAuthProvider,
  signInWithCredential
} from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "812658550878-kl5fv3qri5mipsp9livllcbfm5i7ngvi.apps.googleusercontent.com",
});

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged disparou, user:", user);
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }
  const loginWithGoogle = async () =>{
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    const idToken = response.data?.idToken;

    if(!idToken){
      throw new Error("Não foi possível obter o idToken Google");
    }

    const credential = GoogleAuthProvider.credential(idToken)

    await signInWithCredential(auth, credential)
  };
  const register = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);

  }
  const logout = async () => {
    console.log("antes do signOut");
    await signOut(auth);
    console.log("depois do signOut");
  }
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
