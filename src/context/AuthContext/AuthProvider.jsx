import { useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import app from "../../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createUser = (email, password) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setIsLoading(true);
    Cookies.remove("core");
    queryClient.clear();
    setRole(null);
    setUser(null);
    return signOut(auth);
  };

  // 🔄 onAuthStateChanged listener
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userInfo = { email: currentUser.email };

        //     try {
        //       const res = await axios.post(
        //         "https://mtsbackend20-production.up.railway.app/api/teamMember/login",
        //         userInfo,
        //       );

        //       const token = res.data?.token;
        //       const teamMember = res.data?.teamMember;

        //       if (token && teamMember) {
        //         Cookies.set("core", token, { expires: 1 });
        //         setRole(teamMember.role);
        //         setDbUser(teamMember);
        //       } else {
        //         console.warn("⚠️ Login succeeded, but token or role missing.");
        //       }
        //     } catch (error) {
        //       const status = error?.response?.status;
        //       console.error("❌ Login fetch failed:", error);

        //       if (status === 401 || status === 403) {
        //         Cookies.remove("core");
        //         setRole(null);
        //       }
        //     }
        //   } else {
        //     setUser(null);
        //     setRole(null);
        //     Cookies.remove("core");
        //   }

        setIsLoading(false);
      }
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    dbUser,
    isLoading,
    setIsLoading,
    createUser,
    signInUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
