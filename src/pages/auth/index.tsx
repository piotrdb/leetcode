import NavBar from '@/src/components/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AuthModal from '@/src/components/Modals/AuthModal';
import { authModalState } from '@/src/atoms/authModalAtom';
import { useRecoilValue } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/firebase';
import { useRouter } from 'next/router';

type AuthPageProps = {};

const AuthPage: React.FC<AuthPageProps> = () => {
  const authModal = useRecoilValue(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
    if (!loading && !user) {
      setPageLoading(false);
    }
  }, [user, router, loading]);

  if (pageLoading) {
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-gray-500 to-gray-800 h-screen relative">
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <div className="flex items-center justify-center h-[calc(100vh-7rem)] pointer-events-none select-none">
          <Image width={750} height="1" src="/hero.png" alt="hero img" />
        </div>
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};

export default AuthPage;
