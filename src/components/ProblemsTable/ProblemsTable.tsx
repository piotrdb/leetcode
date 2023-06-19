import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';
import { problems } from '../../mockProblems/problems';
import Link from 'next/link';

type ProblemsTableProps = {};

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
  return (
    <tbody className="text-white">
      {problems.map((problem, id) => {
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
              <BsCheckCircle fontSize="18" width="18" />
            </th>
            <td className="px-6 py-4">
              <Link
                className="hover:text-blue-600 cursor-pointer"
                href={`/problems/${problem.id}`}
              >
                {problem.title}
              </Link>
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
                />
              ) : (
                <p className="text-gray-400">Coming soon</p>
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProblemsTable;
