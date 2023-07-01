import { useEffect, useState } from 'react';
import ProblemsTable from '../components/ProblemsTable/ProblemsTable';
import TopBar from '../components/TopBar/TopBar';
import useHasMounted from '../hooks/useHasMounted';
import { tableFilterState } from '../atoms/tableFilterAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  BsSortDown,
  BsSortNumericDownAlt,
  BsSortNumericUp,
  BsSortUpAlt,
} from 'react-icons/bs';
import Filters from '../components/Filters/Filters';

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const setTableFilterState = useSetRecoilState(tableFilterState);
  const tfState = useRecoilValue(tableFilterState);
  const hasMounted = useHasMounted();

  useEffect(() => {
    setTableFilterState({ type: 'order', order: 'ascending' });
  }, [setTableFilterState]);

  if (!hasMounted) {
    return null;
  }

  const handleSortClick = (target: 'order' | 'difficulty') => {
    if (tfState.type === target) {
      setTableFilterState((prev) => ({
        ...prev,
        order: prev.order === 'descending' ? 'ascending' : 'descending',
      }));
    } else {
      setTableFilterState((prev) => ({
        ...prev,
        type: target,
        order: 'ascending',
      }));
    }
  };

  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <TopBar />
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        <Filters />
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto table-auto">
          <thead className="text-md text-gray-700 uppercase dark:text-gray-400 border-b ">
            <tr>
              <th scope="col" className="px-4 py-3 w-0 text-lg font-medium">
                Status
              </th>
              <th
                scope="col"
                className={`px-6 py-3 w-0 font-medium cursor-pointer text-lg hover:bg-dark-layer-1 ${
                  tfState.type === 'order' ? 'text-white' : ''
                }`}
                onClick={() => handleSortClick('order')}
              >
                Title
                {tfState.type === 'order' &&
                  (tfState.order === 'ascending' ? (
                    <BsSortNumericUp className="inline-block ml-4 mb-1 w-5 h-5" />
                  ) : (
                    <BsSortNumericDownAlt className="inline-block ml-4 mb-1 w-5 h-5" />
                  ))}
              </th>
              <th
                scope="col"
                className={`px-6 py-3 w-0 font-medium cursor-pointer text-lg hover:bg-dark-layer-1 ${
                  tfState.type === 'difficulty' ? 'text-white' : ''
                }`}
                onClick={() => handleSortClick('difficulty')}
              >
                Difficulty
                {tfState.type === 'difficulty' &&
                  (tfState.order === 'ascending' ? (
                    <BsSortUpAlt className="inline-block ml-4 mb-1 w-5 h-5" />
                  ) : (
                    <BsSortDown className="inline-block ml-4 mb-1 w-5 h-5" />
                  ))}
              </th>
              <th scope="col" className="px-6 py-3 w-0 text-lg font-medium">
                Category
              </th>
              <th scope="col" className="px-6 py-3 w-0 text-lg font-medium">
                Solution
              </th>
            </tr>
          </thead>
          <ProblemsTable setLoadingProblems={setLoadingProblems} />
        </table>
        {loadingProblems && (
          <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
            {[...Array(10)].map((_, id) => (
              <LoadingSkeleton key={id} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-60 w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-60 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-60 w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-60 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
