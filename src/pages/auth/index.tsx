import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AuthModal from '@/src/components/Modals/AuthModal';
import { authModalState } from '@/src/atoms/authModalAtom';
import { useRecoilValue } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/src/firebase/firebase';
import { useRouter } from 'next/router';
import TopBar from '@/src/components/TopBar/TopBar';
import Particle from '@/src/components/Particle/Particle';

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
    <div className="h-screen relative">
      <TopBar />
      <div className="max-w-7xl mx-auto">
        <Particle />
        {authModal.isOpen && <AuthModal />}
      </div>
    </div>
  );
};

export default AuthPage;
