import { auth, firestore } from '@/src/firebase/firebase';
import { Problem } from '@/src/utils/types/problem';
import {
  arrayRemove,
  arrayUnion,
  doc,
  runTransaction,
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import RectangleSkeleton from '../../Skeletons/CircleSkeleton';
import CircleSkeleton from '../../Skeletons/RectangleSkeleton';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import Image from 'next/image';
import useGetCurrentProblem from '@/src/hooks/useGetCurrentProblem';
import useGetUserProblemData from '@/src/hooks/useGetUserProblemData';

type ProblemDescriptionProps = {
  problem: Problem;
  _solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({
  problem,
  _solved,
}) => {
  const [user] = useAuthState(auth);
  const [updating, setUpdating] = useState(false);

  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } =
    useGetCurrentProblem(problem.id);

  const { liked, disliked, starred, solved, setUsersData } =
    useGetUserProblemData(problem.id);

  const returnUserDataAndProblemData = async (transaction: any) => {
    const userRef = doc(firestore, 'users', user!.uid);
    const problemRef = doc(firestore, 'problems', problem.id);
    const userDoc = await transaction.get(userRef);
    const problemDoc = await transaction.get(problemRef);

    return { userDoc, problemDoc, userRef, problemRef };
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('You must be logged in to like a problem', {
        position: 'top-left',
        theme: 'dark',
      });

      return;
    }

    if (updating) {
      return;
    }
    setUpdating(true);

    await runTransaction(firestore, async (transaction) => {
      const { problemDoc, userDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);

      if (userDoc.exists() && problemDoc.exists()) {
        if (liked) {
          transaction.update(userRef, {
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes - 1,
          });

          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes - 1 } : null
          );

          setUsersData((prev) => ({ ...prev, liked: false }));
        } else if (disliked) {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
            dislikes: problemDoc.data().dislikes - 1,
          });

          setCurrentProblem((prev) =>
            prev
              ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 }
              : null
          );

          setUsersData((prev) => ({ ...prev, liked: true, disliked: false }));
        } else {
          transaction.update(userRef, {
            likedProblems: [...userDoc.data().likedProblems, problem.id],
          });
          transaction.update(problemRef, {
            likes: problemDoc.data().likes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, likes: prev.likes + 1 } : null
          );
          setUsersData((prev) => ({ ...prev, liked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleDislike = async () => {
    if (!user) {
      toast.error('You must be logged in to dislike a problem', {
        position: 'top-left',
        theme: 'dark',
      });
      return;
    }
    if (updating) return;
    setUpdating(true);
    await runTransaction(firestore, async (transaction) => {
      const { problemDoc, userDoc, problemRef, userRef } =
        await returnUserDataAndProblemData(transaction);
      if (userDoc.exists() && problemDoc.exists()) {
        if (disliked) {
          transaction.update(userRef, {
            dislikedProblems: userDoc
              .data()
              .dislikedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes - 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes - 1 } : null
          );
          setUsersData((prev) => ({ ...prev, disliked: false }));
        } else if (liked) {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
            likedProblems: userDoc
              .data()
              .likedProblems.filter((id: string) => id !== problem.id),
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
            likes: problemDoc.data().likes - 1,
          });
          setCurrentProblem((prev) =>
            prev
              ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 }
              : null
          );
          setUsersData((prev) => ({ ...prev, disliked: true, liked: false }));
        } else {
          transaction.update(userRef, {
            dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
          });
          transaction.update(problemRef, {
            dislikes: problemDoc.data().dislikes + 1,
          });
          setCurrentProblem((prev) =>
            prev ? { ...prev, dislikes: prev.dislikes + 1 } : null
          );
          setUsersData((prev) => ({ ...prev, disliked: true }));
        }
      }
    });
    setUpdating(false);
  };

  const handleStar = async () => {
    if (!user) {
      toast.error('You must be logged in to star a problem', {
        position: 'top-left',
        theme: 'dark',
      });
      return;
    }
    if (updating) return;
    setUpdating(true);

    if (!starred) {
      const userRef = doc(firestore, 'users', user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayUnion(problem.id),
      });
      setUsersData((prev) => ({ ...prev, starred: true }));
    } else {
      const userRef = doc(firestore, 'users', user.uid);
      await updateDoc(userRef, {
        starredProblems: arrayRemove(problem.id),
      });
      setUsersData((prev) => ({ ...prev, starred: false }));
    }

    setUpdating(false);
  };

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
            <div className="flex space-x-4">
              <div
                dangerouslySetInnerHTML={{ __html: problem.title }}
                className="flex-1 mr-2 text-xl text-white font-medium"
              ></div>
            </div>
            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
                <div
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-5 py-1 text-md font-medium capitalize `}
                >
                  {currentProblem.difficulty}
                </div>
                <div className="rounded p-[3px] ml-4 text-2xl transition-colors duration-200 text-green-s text-dark-green-s">
                  {solved || _solved ? (
                    <BsCheck2Circle />
                  ) : (
                    <BsCheck2Circle color="gray" />
                  )}
                </div>
                <div
                  onClick={handleLike}
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-2xl transition-colors duration-200 text-dark-gray-6"
                >
                  {liked ? <AiFillLike /> : <AiOutlineLike />}
                  <span className="text-sm">{currentProblem.likes}</span>
                </div>
                <div
                  onClick={handleDislike}
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-2xl transition-colors duration-200 text-green-s text-dark-gray-6"
                >
                  {disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                  <span className="text-sm">{currentProblem.dislikes}</span>
                </div>
                <div
                  onClick={handleStar}
                  className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-2xl transition-colors duration-200 text-green-s text-dark-gray-6 "
                >
                  {starred ? (
                    <TiStarFullOutline color="orange" />
                  ) : (
                    <TiStarOutline />
                  )}
                </div>
              </div>
            )}
            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              className="text-white text-md"
            ></div>

            <div className="mt-4">
              {problem.examples.map((example, index) => (
                <div key={example.id}>
                  <p className="font-medium text-white text-lg">
                    Example {example.id + 1}
                  </p>
                  {example.img && (
                    <Image
                      src={example.img}
                      alt="example image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[100%] h-auto mt-3 rounded-xl"
                    />
                  )}
                  <div className="example-card">
                    <pre>
                      <strong className="text-white">Input: </strong>{' '}
                      {example.inputText} <br />
                      <strong>Output:</strong> {example.outputText} <br />
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
              <div className="text-white text-lg font-medium">Constraints:</div>
              <ul
                dangerouslySetInnerHTML={{ __html: problem.constraints }}
                className="text-white ml-5 list-disc pb-4"
              ></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
