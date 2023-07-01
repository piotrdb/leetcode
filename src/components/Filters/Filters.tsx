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

interface ICategoryFilter {
  categories: string[];
  dropdownOpen: boolean;
}

const Filters: React.FC<FiltersProps> = () => {
  const [categoryFilter, setCategoryFilter] = useState<ICategoryFilter>({
    categories: ['Array', 'Intervals'],
    dropdownOpen: false,
  });

  const handleClickDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCategoryFilter({
      ...categoryFilter,
      dropdownOpen: !categoryFilter.dropdownOpen,
    });
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto my-10">
      <div className="relative w-[250px]">
        <button
          onClick={handleClickDropdown}
          className="flex cursor-pointer items-center rounded px-3 py-1.5 text-left focus:outline-none whitespace-nowrap text-dark-label-2 bg-dark-fill-3 hover:bg-dark-fill-2 active:bg-dark-fill-3 w-full justify-between"
          type="button"
        >
          Category
          <BsChevronDown />
        </button>
        {categoryFilter.dropdownOpen && (
          <ul
            className="absolute mt-1 max-h-56 overflow-auto rounded-lg p-2 z-50 focus:outline-none shadow-lg   w-full bg-dark-layer-1"
            style={{
              filter:
                'drop-shadow(rgba(0, 0, 0, 0.04) 0px 1px 3px) drop-shadow(rgba(0, 0, 0, 0.12) 0px 6px 16px)',
            }}
          >
            {CATEGORY_FILTERS.map((category, idx) => (
              <CategoryListItem
                key={idx}
                category={category}
                selectedOptions={categoryFilter.categories}
                handleCategoryClick={(category) => {
                  setCategoryFilter((prevState) => ({
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
    </div>
  );
};

export default Filters;

interface CategoryListItemProps {
  category: string;
  selectedOptions: string[];
  handleCategoryClick: (category: string) => void;
}

const CategoryListItem: React.FC<CategoryListItemProps> = ({
  category,
  selectedOptions,
  handleCategoryClick,
}) => {
  return (
    <li className="relative flex h-8 cursor-pointer select-none py-1.5 pl-2 text-label-2 dark:text-dark-label-2 hover:bg-dark-fill-3 rounded-lg">
      <div
        className={`flex h-5 flex-1 items-center pr-2 ${
          selectedOptions.includes(category) ? 'font-medium' : ''
        }`}
        onClick={() => handleCategoryClick(category)}
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
  );
};
