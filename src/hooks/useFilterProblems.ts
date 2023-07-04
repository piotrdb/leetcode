import { useEffect, useState } from "react";
import { DBProblem } from "../utils/types/problem";
import { TableFilterState } from "../atoms/tableFilterAtom";

function useFilterProblems(
    filterPattern: TableFilterState,
    problems: DBProblem[]
  ) {
    const [tableProblems, setTableProblems] = useState<DBProblem[]>([]);
  
    useEffect(() => {
      let filteredProblems: DBProblem[] = problems;
      if (
        filterPattern.difficulties.length === 0 &&
        filterPattern.categories.length === 0 &&
        filterPattern.searchFilter.length === 0
      ) {
        setTableProblems(filteredProblems);
      } else {
        if (filterPattern.searchFilter.length > 0) {
          filteredProblems = [...filteredProblems].filter((problem) =>
            problem.title
              .toLowerCase()
              .includes(filterPattern.searchFilter.toLowerCase())
          );
        }
        if (filterPattern.difficulties.length > 0) {
          filteredProblems = [...filteredProblems].filter((problem) =>
            filterPattern.difficulties.includes(problem.difficulty)
          );
        }
        if (filterPattern.categories.length > 0) {
          filteredProblems = [...filteredProblems].filter((problem) =>
            filterPattern.categories.includes(problem.category)
          );
        }
        setTableProblems(filteredProblems);
      }
    }, [filterPattern, problems]);
  
    return tableProblems;
  }

  export default useFilterProblems