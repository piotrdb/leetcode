import { auth } from '@/src/firebase/firebase';
import { sign } from 'crypto';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

type LogoutProps = {};

const Logout: React.FC<LogoutProps> = () => {
  const [signOut, loading, error] = useSignOut(auth);

  const handleLogout = () => {
    signOut();
    return toast.success('Logged out', {
      position: 'top-center',
      autoClose: 3000,
      theme: 'dark',
    });
  };

  return (
    <button
      className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer ronded text-brand-orange hover:scale-110 transition-all duration-300 ease-in-out"
      onClick={handleLogout}
    >
      <FiLogOut />
    </button>
  );
};

export default Logout;
