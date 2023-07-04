import React, { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import Link from 'next/link';
import YouTube from 'react-youtube';
import { useRecoilValue } from 'recoil';
import { tableSortState } from '@/src/atoms/tableSortAtom';
import { tableFilterState } from '@/src/atoms/tableFilterAtom';
import useFilterProblems from '@/src/hooks/useFilterProblems';
import useGetProblems from '@/src/hooks/useGetProblems';
import useGetSolvedProblems from '@/src/hooks/useGetSolvedProblems';
import useSortProblems from '@/src/hooks/useSortProblems';

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
}) => {
  const filterPattern = useRecoilValue(tableFilterState);
  const sortType = useRecoilValue(tableSortState);
  const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();
  const filteredProblems = useFilterProblems(filterPattern, problems);
  const tableProblems = useSortProblems(sortType, filteredProblems);

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
            (filterPattern.statuses.length === 0 ||
              (filterPattern.statuses.includes('Done') &&
                solvedProblems.includes(problem.id)) ||
              (filterPattern.statuses.includes('Todo') &&
                !solvedProblems.includes(problem.id))) && (
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
            )
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
