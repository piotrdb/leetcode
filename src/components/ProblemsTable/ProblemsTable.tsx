import React, { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import Link from 'next/link';
import YouTube from 'react-youtube';
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { auth, firestore } from '@/src/firebase/firebase';
import { DBProblem } from '@/src/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';
import { tableFilterState } from '@/src/atoms/tableFilterAtom';

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
}) => {
  const tableFilter = useRecoilValue(tableFilterState);
  const [tableProblems, setTableProblems] = useState<DBProblem[]>([]);

  const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();
  const [ytPlayer, setYtPlayer] = useState({
    isOpen: false,
    videoId: '',
  });

  const closeModal = () => {
    setYtPlayer({ isOpen: false, videoId: '' });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    let temp: DBProblem[] = [];
    const sortMap = {
      Easy: 0,
      Medium: 1,
      Hard: 2,
    };

    if (tableFilter.type === 'order' && tableFilter.order === 'ascending') {
      temp = [...problems].sort((a, b) =>
        a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      );
    } else if (
      tableFilter.type === 'order' &&
      tableFilter.order === 'descending'
    ) {
      temp = [...problems].sort((a, b) =>
        a.order < b.order ? 1 : b.order < a.order ? -1 : 0
      );
    } else if (
      tableFilter.type === 'difficulty' &&
      tableFilter.order === 'ascending'
    ) {
      temp = [...problems].sort(
        (a, b) =>
          sortMap[a.difficulty as keyof typeof sortMap] -
          sortMap[b.difficulty as keyof typeof sortMap]
      );
    } else if (
      tableFilter.type === 'difficulty' &&
      tableFilter.order === 'descending'
    ) {
      temp = [...problems].sort(
        (a, b) =>
          sortMap[b.difficulty as keyof typeof sortMap] -
          sortMap[a.difficulty as keyof typeof sortMap]
      );
    }
    setTableProblems(temp);
  }, [problems, tableFilter]);

  return (
    <>
      <tbody className="text-white">
        {tableProblems.map((problem, id) => {
          const difficultyColor =
            problem.difficulty === 'Easy'
              ? 'text-dark-green-s'
              : problem.difficulty === 'Medium'
              ? 'text-dark-yellow'
              : 'text-dark-pink';
          return (
            <tr
              className={`text-l ${id % 2 == 1 ? 'bg-dark-layer-1' : ''}`}
              key={problem.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                {solvedProblems.includes(problem.id) ? (
                  <BsCheckCircle fontSize="18" />
                ) : (
                  <BsCheckCircle fontSize="18" color="gray" />
                )}
              </th>
              <td className="px-6 py-4">
                {problem.link ? (
                  <Link
                    href={problem.link}
                    target="_blank"
                    className="group relative transition-all duration-300 hover:text-blue-600 cursor-pointer"
                  >
                    {problem.order}. {problem.title}
                    <div
                      className="absolute top-0 -translate-x-[110%] translate-y-[-25%] mx-auto w-[180px] text-md text-center bg-brand-orange-h text-dark-layer-1 p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 
                transition-all duration-300 ease-in-out font-medium"
                    >
                      <p className="text-md">Go to LeetCode.com</p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    className="hover:text-blue-600 cursor-pointer transition-all duration-300"
                    href={`/problems/${problem.id}`}
                  >
                    {problem.order}. {problem.title}
                  </Link>
                )}
              </td>
              <td className={`px-6 py-4 ${difficultyColor}`}>
                {problem.difficulty}
              </td>
              <td className="px-6 py-4">{problem.category}</td>
              <td className="px-6 py-4">
                {problem.videoId ? (
                  <AiFillYoutube
                    fontSize="28"
                    className="cursor-pointer hover:text-red-500"
                    onClick={() =>
                      setYtPlayer({
                        isOpen: true,
                        videoId: problem.videoId as string,
                      })
                    }
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {ytPlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center ">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}
          ></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <CgClose
                  fontSize={'35'}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={closeModal}
                />
                <YouTube
                  videoId={ytPlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};

export default ProblemsTable;

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
