import { useEffect, useState } from "react";
import { DBProblem } from "../utils/types/problem";
import { TableSortState } from "../atoms/tableSortAtom";


function useSortProblems(sortFilter: TableSortState, problems: DBProblem[]) {
    const [tableProblems, setTableProblems] = useState<DBProblem[]>([]);
  
    useEffect(() => {
      let temp: DBProblem[] = [];
      const sortMap = {
        Easy: 0,
        Medium: 1,
        Hard: 2,
      };
  
      if (sortFilter.type === 'order' && sortFilter.order === 'ascending') {
        temp = [...problems].sort((a, b) =>
          a.order > b.order ? 1 : b.order > a.order ? -1 : 0
        );
      } else if (
        sortFilter.type === 'order' &&
        sortFilter.order === 'descending'
      ) {
        temp = [...problems].sort((a, b) =>
          a.order < b.order ? 1 : b.order < a.order ? -1 : 0
        );
      } else if (
        sortFilter.type === 'difficulty' &&
        sortFilter.order === 'ascending'
      ) {
        temp = [...problems].sort(
          (a, b) =>
            sortMap[a.difficulty as keyof typeof sortMap] -
            sortMap[b.difficulty as keyof typeof sortMap]
        );
      } else if (
        sortFilter.type === 'difficulty' &&
        sortFilter.order === 'descending'
      ) {
        temp = [...problems].sort(
          (a, b) =>
            sortMap[b.difficulty as keyof typeof sortMap] -
            sortMap[a.difficulty as keyof typeof sortMap]
        );
      }
      setTableProblems(temp);
    }, [problems, sortFilter]);
  
    return tableProblems;
  }

export default useSortProblems;