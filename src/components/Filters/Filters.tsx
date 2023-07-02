import React, { useState } from 'react';
import { BsCheckLg, BsChevronDown } from 'react-icons/bs';

type FiltersProps = {};

const DIFFICULTY_FILTERS = ['Easy', 'Medium', 'Hard'];

const CATEGORY_FILTERS = [
  'Array',
  'Backtracking',
  'Binary Search',
  'Dynamic Programming',
  'Intervals',
  'Linked List',
  'Stack',
  'Tree',
  'Two Pointers',
];

const STATUS_FILTERS = ['Done', 'Todo'];

interface IFilters {
  categories: string[];
  difficulties: string[];
  statuses: string[];
  categoriesDropdownOpen: boolean;
  difficultiesDropdownOpen: boolean;
  statusesDropdownOpen: boolean;
}

const Filters: React.FC<FiltersProps> = () => {
  const [filters, setFilters] = useState<IFilters>({
    categories: [],
    difficulties: [],
    statuses: [],
    categoriesDropdownOpen: false,
    difficultiesDropdownOpen: false,
    statusesDropdownOpen: false,
  });

  const handleClickCategoryDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setFilters({
      ...filters,
      categoriesDropdownOpen: !filters.categoriesDropdownOpen,
      difficultiesDropdownOpen: false,
      statusesDropdownOpen: false,
    });
  };

  const handleClickDifficultyDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setFilters({
      ...filters,
      difficultiesDropdownOpen: !filters.difficultiesDropdownOpen,
      categoriesDropdownOpen: false,
      statusesDropdownOpen: false,
    });
  };

  const handleClickStatusDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setFilters({
      ...filters,
      statusesDropdownOpen: !filters.statusesDropdownOpen,
      categoriesDropdownOpen: false,
      difficultiesDropdownOpen: false,
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto my-10 flex gap-5">
      <div className="relative w-[250px]">
        <button
          onClick={handleClickCategoryDropdown}
          className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap text-dark-label-2 bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between"
          type="button"
        >
          Category
          <BsChevronDown />
        </button>
        {filters.categoriesDropdownOpen && (
          <ul
            className="absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg   w-full bg-dark-layer-1"
            style={{
              filter:
                'drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)',
            }}
          >
            {CATEGORY_FILTERS.map((category, idx) => (
              <FilterListItem
                key={idx}
                category={category}
                selectedOptions={filters.categories}
                handleCategoryClick={(category) => {
                  setFilters((prevState) => ({
                    ...prevState,
                    categories: prevState.categories.includes(category)
                      ? prevState.categories.filter((item) => item != category)
                      : [...prevState.categories, category],
                  }));
                }}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="relative w-[250px]">
        <button
          onClick={handleClickDifficultyDropdown}
          className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap text-dark-label-2 bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between"
          type="button"
        >
          Difficulty
          <BsChevronDown />
        </button>
        {filters.difficultiesDropdownOpen && (
          <ul
            className="absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg   w-full bg-dark-layer-1"
            style={{
              filter:
                'drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)',
            }}
          >
            {DIFFICULTY_FILTERS.map((difficulty, idx) => (
              <FilterListItem
                key={idx}
                difficulty={difficulty}
                selectedOptions={filters.difficulties}
                handleDifficultyClick={(difficulty) => {
                  setFilters((prevState) => ({
                    ...prevState,
                    difficulties: prevState.difficulties.includes(difficulty)
                      ? prevState.difficulties.filter(
                          (item) => item != difficulty
                        )
                      : [...prevState.difficulties, difficulty],
                  }));
                }}
              />
            ))}
          </ul>
        )}
      </div>
      <div className="relative w-[250px]">
        <button
          onClick={handleClickStatusDropdown}
          className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap text-dark-label-2 bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between"
          type="button"
        >
          Status
          <BsChevronDown />
        </button>
        {filters.statusesDropdownOpen && (
          <ul
            className="absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg   w-full bg-dark-layer-1"
            style={{
              filter:
                'drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)',
            }}
          >
            {STATUS_FILTERS.map((status, idx) => (
              <FilterListItem
                key={idx}
                status={status}
                selectedOptions={filters.statuses}
                handleStatusClick={(status) => {
                  setFilters((prevState) => ({
                    ...prevState,
                    statuses: prevState.statuses.includes(status)
                      ? prevState.statuses.filter((item) => item != status)
                      : [...prevState.statuses, status],
                  }));
                }}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filters;

interface FilterListItemProps {
  category?: string;
  difficulty?: string;
  status?: string;
  selectedOptions: string[];
  handleCategoryClick?: (category: string) => void;
  handleDifficultyClick?: (difficulty: string) => void;
  handleStatusClick?: (status: string) => void;
}

const FilterListItem: React.FC<FilterListItemProps> = ({
  category,
  difficulty,
  status,
  selectedOptions,
  handleCategoryClick,
  handleDifficultyClick,
  handleStatusClick,
}) => {
  return (
    <>
      {category && handleCategoryClick && (
        <li
          onClick={() => handleCategoryClick(category)}
          className="relative flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 dark:text-dark-label-2 hover:bg-dark-fill-3 rounded-lg"
        >
          <div
            className={`flex h-5 flex-1 items-center pr-2 ${
              selectedOptions.includes(category) ? 'font-medium' : ''
            }`}
          >
            <div className="whitespace-nowrap">{category}</div>
          </div>
          <span
            className={`text-blue dark:text-dark-blue flex items-center pr-2 ${
              selectedOptions.includes(category) ? 'visible' : 'invisible'
            }`}
          >
            <BsCheckLg />
          </span>
        </li>
      )}
      {difficulty && handleDifficultyClick && (
        <li
          onClick={() => handleDifficultyClick(difficulty)}
          className="relative flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 dark:text-dark-label-2 hover:bg-dark-fill-3 rounded-lg"
        >
          <div
            className={`flex h-5 flex-1 items-center pr-2 ${
              selectedOptions.includes(difficulty) ? 'font-medium' : ''
            }`}
          >
            <div className="whitespace-nowrap">{difficulty}</div>
          </div>
          <span
            className={`text-blue dark:text-dark-blue flex items-center pr-2 ${
              selectedOptions.includes(difficulty) ? 'visible' : 'invisible'
            }`}
          >
            <BsCheckLg />
          </span>
        </li>
      )}
      {status && handleStatusClick && (
        <li
          onClick={() => handleStatusClick(status)}
          className="relative flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 dark:text-dark-label-2 hover:bg-dark-fill-3 rounded-lg"
        >
          <div
            className={`flex h-5 flex-1 items-center pr-2 ${
              selectedOptions.includes(status) ? 'font-medium' : ''
            }`}
          >
            <div className="whitespace-nowrap">{status}</div>
          </div>
          <span
            className={`text-blue dark:text-dark-blue flex items-center pr-2 ${
              selectedOptions.includes(status) ? 'visible' : 'invisible'
            }`}
          >
            <BsCheckLg />
          </span>
        </li>
      )}
    </>
  );
};
