import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/firebase';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import Timer from '../Timer/Timer';
import { useRouter } from 'next/router';
import { problemsArray } from '@/src/utils/problems';
import { Problem } from '@/src/utils/types/problem';

type TopBarProps = {
  problemPage?: boolean;
};

const TopBar: React.FC<TopBarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);

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
        <Link href="/" className="h-[28px] flex-1">
          <Image
            src="/logo-full.png"
            alt="Logo"
            className="h-full"
            height={100}
            width={120}
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
          {!user && (
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
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
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
                className="absolute top-14 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 
                transition-all duration-300 ease-in-out font-medium"
              >
                <p className="text-md">{user.email}</p>
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
