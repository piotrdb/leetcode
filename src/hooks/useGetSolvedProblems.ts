import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function useGetSolvedProblems() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [user] = useAuthState(auth);
  
    useEffect(() => {
      const getSolvedProblems = async () => {
        const userRef = doc(firestore, 'users', user!.uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          setSolvedProblems(userDoc.data().solvedProblems);
        }
      };
  
      if (user) {
        getSolvedProblems();
      }
    }, [user]);
  
    return solvedProblems;
  }

export default useGetSolvedProblems;