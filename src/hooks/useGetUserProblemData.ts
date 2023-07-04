import { useEffect, useState } from "react";
import { auth, firestore } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

function useGetUserProblemData(problemId: string) {
    const [usersData, setUsersData] = useState({
      liked: false,
      disliked: false,
      starred: false,
      solved: false,
    });
    const [user] = useAuthState(auth);
  
    useEffect(() => {
      const getUsersProblemData = async () => {
        const userRef = doc(firestore, 'users', user!.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const {
            likedProblems,
            dislikedProblems,
            starredProblems,
            solvedProblems,
          } = data;
          setUsersData({
            liked: likedProblems.includes(problemId),
            disliked: dislikedProblems.includes(problemId),
            starred: starredProblems.includes(problemId),
            solved: solvedProblems.includes(problemId),
          });
        }
      };
  
      if (user) {
        getUsersProblemData();
      }
  
      return () =>
        setUsersData({
          liked: false,
          disliked: false,
          starred: false,
          solved: false,
        });
    }, [problemId, user]);
  
    return { ...usersData, setUsersData };
  }

export default useGetUserProblemData;