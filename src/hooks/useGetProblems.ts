import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { DBProblem } from "../utils/types/problem";

function useGetProblems(
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    const [problems, setProblems] = useState<DBProblem[]>([]);
  
    useEffect(() => {
      const getProblems = async () => {
        setLoadingProblems(true);
        const q = query(
          collection(firestore, 'problems'),
          orderBy('order', 'asc')
        );
        const temp: DBProblem[] = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() } as DBProblem);
        });
        setProblems(temp);
        setLoadingProblems(false);
      };
  
      getProblems();
    }, [setLoadingProblems]);
  
    return problems;
  }
  

export default useGetProblems