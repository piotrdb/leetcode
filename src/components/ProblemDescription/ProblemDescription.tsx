import { firestore } from '@/src/firebase/firebase';
import { DBProblem, Problem } from '@/src/utils/types/problem';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';

type ProblemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const { currentProblem, loading, problemDifficultyClass } =
    useGetCurrentProblem(problem.id);

  return (
    <div className="bg-dark-layer-1">
      <div className="flex h-14 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            'bg-dark-layer-1 rounded-t-[5px] px-6 py-[12px] text-md font-medium cursor-pointer'
          }
        >
          Description
        </div>
      </div>
      <div className="flex px-0 py-4 h-[calc(100vh-106px)] overflow-y-auto">
        <div className="px-5">
          <div className="w-full">
            {!loading && currentProblem && (
              <>
                <div className="flex space-x-4">
                  <div className="flex-1 mr-2 text-xl text-white font-medium">
                    {currentProblem.title}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <div
                    className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                  >
                    {currentProblem.difficulty}
                  </div>
                  <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                    <BsCheck2Circle />
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6">
                    <AiFillLike />
                    <span className="text-xs">{currentProblem.likes}</span>
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                    <AiFillDislike />
                    <span className="text-xs">{currentProblem.dislikes}</span>
                  </div>
                  <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ">
                    <TiStarOutline />
                  </div>
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
                  className="text-white text-md"
                ></div>

                <div className="mt-4">
                  {problem.examples.map((example, index) => (
                    <div key={example.id}>
                      <p className="font-medium text-white text-lg">
                        Example {example.id}
                      </p>
                      <div className="example-card">
                        <pre>
                          <strong className="text-white">Input: </strong>{' '}
                          {example.inputText} <br />
                          <strong>Output:</strong> {example.outputText} <br />
                          {example.img && (
                            <img
                              src={example.img}
                              alt="example image"
                              className="my-3 rounded-md"
                            />
                          )}
                          {example.explanation && (
                            <p>
                              <strong>Explanation:</strong>
                              {example.explanation}
                            </p>
                          )}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="my-5">
                  <div className="text-white text-lg font-medium">
                    Constraints:
                  </div>
                  <ul
                    dangerouslySetInnerHTML={{ __html: problem.constraints }}
                    className="text-white ml-5 list-disc pb-4"
                  ></ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState(true);
  const [problemDifficultyClass, setProblemDifficultyClass] = useState('');
  useEffect(() => {
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, 'problems', problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data();
        setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
        setProblemDifficultyClass(
          problem.difficulty === 'Easy'
            ? 'bg-olive text-olive'
            : problem.difficulty === 'Medium'
            ? 'bg-dark-yellow text-dark-yellow'
            : 'bg-dark-pink text-dark-pink'
        );
        setLoading(false);
      }
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, loading, problemDifficultyClass };
}
