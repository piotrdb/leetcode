import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function useGetUserDisplayName() {
  const [displayName, setDisplayName] = useState<string>('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getDisplayName = async () => {
      const userRef = doc(firestore, 'users', user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setDisplayName(userDoc.data().displayName);
      }
    };

    if (user) {
      getDisplayName();
    }
  }, [user]);

  return displayName;
}

export default useGetUserDisplayName