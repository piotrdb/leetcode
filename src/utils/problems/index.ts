import { Problem } from "../types/problem";
import { jumpGame } from "./jump-game";
import { reverseLinkedList } from "./reverse-linked-list";
import { search2DMatrix } from "./search-a-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parentheses";

interface ProblemMap{
    [key: string]: Problem;
}

export const problemsArray: ProblemMap = {
    "two-sum": twoSum,
    "jump-game": jumpGame,
    "search-2d-matrix": search2DMatrix,
    "valid-parentheses": validParentheses,
    "reverse-linked-list": reverseLinkedList,
}