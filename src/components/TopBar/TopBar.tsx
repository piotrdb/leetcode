import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/src/firebase/firebase';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import Timer from '../Timer/Timer';
import { useRouter } from 'next/router';
import { problemsArray } from '@/src/utils/problems';
import { Problem } from '@/src/utils/types/problem';
import { doc, getDoc } from 'firebase/firestore';

type TopBarProps = {
  problemPage?: boolean;
};

const TopBar: React.FC<TopBarProps> = ({ problemPage }) => {
  const [user, userLoading] = useAuthState(auth);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);
  const displayName = useGetDisplayName();

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problemsArray[router.query.pid as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;

    const nextProblemKey = Object.keys(problemsArray).find(
      (key) => problemsArray[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problemsArray).find(
        (key) => problemsArray[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problemsArray).find(
        (key) => problemsArray[key].order === Object.keys(problemsArray).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between ${
          !problemPage ? 'max-w-[1200px] mx-auto' : ''
        }`}
      >
        <Link href="/" className="h-[38px] flex-1">
          <Image
            src="/logo.png"
            alt="Logo"
            className="w-auto h-[100%] bg-gray-300 rounded-2xl py-0.5 px-3 hover:scale-105 transition-all duration-300"
            height={0}
            width={0}
            sizes="100vw"
          />
        </Link>
        {problemPage && (
          <div className="flex items-center gap-4 flex-1 justify-center">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-10 w-10 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-width-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-10 w-10 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          {!user && !userLoading && (
            <>
              <Link
                href="/auth"
                onClick={() => {
                  setAuthModalState((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: 'login',
                  }));
                }}
              >
                <button className="bg-dark-fill-3 py-1.5 px-4 cursor-pointer rounded hover:bg-dark-fill-2 hover:rounded-xl duration-300 ">
                  Sign In
                </button>
              </Link>
              <Link
                href="/auth"
                onClick={() => {
                  setAuthModalState((prev) => ({
                    ...prev,
                    isOpen: true,
                    type: 'register',
                  }));
                }}
              >
                <button className="bg-dark-fill-3 py-1.5 px-4 cursor-pointer rounded hover:bg-dark-fill-2 hover:rounded-xl duration-300">
                  Sign Up
                </button>
              </Link>
            </>
          )}
          {user && problemPage && <Timer />}
          {user && (
            <div className="cursor-pointer group relative">
              <Image
                src="/avatar.png"
                alt="user profile img"
                className="h-10 w-10 rounded-full"
                height={100}
                width={100}
              />
              <div
                className="absolute top-14 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange py-2 px-4 rounded shadow-lg z-40 group-hover:scale-100 scale-0 
                transition-all duration-300 ease-in-out font-medium"
              >
                <p className="text-md">{displayName}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </div>
    </nav>
  );
};
export default TopBar;

function useGetDisplayName() {
  const [displayName, setDisplayName] = useState<string>('');
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getDisplayName = async () => {
      const userRef = doc(firestore, 'users', user!.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        setDisplayName(userDoc.data().displayName);
      }
    };

    if (user) {
      getDisplayName();
    }
  }, [user]);

  return displayName;
}
