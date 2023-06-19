import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/firebase';
import Logout from '../Buttons/Logout';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';

type TopBarProps = {};

const TopBar: React.FC<TopBarProps> = () => {
  const [user] = useAuthState(auth);

  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div
        className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}
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
                transition-all duration-300 ease-in-out"
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
