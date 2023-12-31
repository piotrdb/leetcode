import React from 'react';
import { CgClose } from 'react-icons/cg';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import { authModalState } from '../../atoms/authModalAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useCloseModal from '@/src/hooks/useCloseModal';

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleBackClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: 'login' }));
  };
  const authModal = useRecoilValue(authModalState);
  const closeModal = useCloseModal();

  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 cursor-pointer"
        onClick={closeModal}
      ></div>
      <div className="w-full sm:w-[450px]  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]  flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow relative w-full bg-gradient-to-b from-[rgb(25,25,25)] to-[rgb(35,35,35)] mx-6">
            <div className="flex justify-end p-2">
              {authModal.type === 'forgotPassword' ? (
                <button
                  onClick={handleBackClick}
                  type="button"
                  className="bg-transparent rounded-lg text-sm p-1.5 mr-auto inline-flex items-center hover:bg-[rgb(55,55,55)] hover:text-white text-white transition-all duration-300"
                >
                  <RiArrowGoBackFill className="h-6 w-6" />
                </button>
              ) : (
                <></>
              )}
              <button
                onClick={closeModal}
                type="button"
                className="bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-[rgb(55,55,55)] hover:text-white text-white transition-all duration-300"
              >
                <CgClose className="h-6 w-6" />
              </button>
            </div>
            {authModal.type === 'register' ? (
              <Signup />
            ) : authModal.type === 'login' ? (
              <Login />
            ) : (
              <ResetPassword />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
