import { tableFilterState } from '@/src/atoms/tableFilterAtom';
import React from 'react';
import { CgClose } from 'react-icons/cg';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type FiltersListProps = {};

const FiltersList: React.FC<FiltersListProps> = () => {
  const { categories, difficulties, statuses } =
    useRecoilValue(tableFilterState);
  const setTableFilterState = useSetRecoilState(tableFilterState);

  return (
    <div className="min-h-[80px] flex gap-2 flex-wrap">
      {[...categories, ...difficulties, ...statuses].map((filter, idx) => (
        <div
          key={idx}
          className={`pl-5 pr-3 h-8 py-1 flex text-sm justify-center items-center  gap-2 rounded-2xl bg-dark-fill-2 ${
            filter === 'Easy'
              ? 'text-green-500'
              : filter === 'Medium'
              ? 'text-yellow-500'
              : filter === 'Hard'
              ? 'text-red-500'
              : 'text-gray-300'
          } `}
        >
          {filter}
          <div className="cursor-pointer rounded-full hover:bg-gray-500 p-0.5 duration-300 text-gray-300">
            <CgClose
              className="h-4 w-4"
              onClick={() => {
                setTableFilterState((prevState) => ({
                  ...prevState,
                  categories: prevState.categories.includes(filter)
                    ? prevState.categories.filter((item) => item != filter)
                    : [...prevState.categories],
                  difficulties: prevState.difficulties.includes(filter)
                    ? prevState.difficulties.filter((item) => item != filter)
                    : [...prevState.difficulties],
                  statuses: prevState.statuses.includes(filter)
                    ? prevState.statuses.filter((item) => item != filter)
                    : [...prevState.statuses],
                }));
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiltersList;
