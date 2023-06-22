import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState, AuthModalType } from '../../atoms/authModalAtom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../firebase/firebase';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const handleClick = (type: AuthModalType) => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };
  const [inputs, setInputs] = useState({
    email: '',
    displayName: '',
    password: '',
  });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName) {
      return toast.error('In order to sign in please fill all fields', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    }
    try {
      toast.loading('Creating your account', {
        position: 'top-center',
        toastId: 'loadingToast',
        theme: 'dark',
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.displayName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, 'users', userData.uid), userData);
      router.push('/');
    } catch (error: any) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    } finally {
      toast.dismiss('loadingToast');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
      <h3 className="text-xl tracking-wider text-center font-medium text-white cursor-default">
        Register to LeetClone
      </h3>
      <div>
        <label
          htmlFor="email"
          className="text-md font-medium block mb-2 text-gray-200 capitalize"
        >
          Your e-mail
        </label>
        <input
          onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          placeholder="name@domain.com"
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-700 placeholder-gray-500 text-black transition-all duration-300"
        ></input>
      </div>
      <div>
        <label
          htmlFor="displayName"
          className="text-md font-medium block mb-2 text-gray-200 capitalize"
        >
          Display name
        </label>
        <input
          onChange={handleChangeInput}
          type="displayName"
          name="displayName"
          id="displayName"
          placeholder="Your display name"
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-700 placeholder-gray-500 text-black transition-all duration-300"
        ></input>
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-md font-medium block mb-2 text-gray-200 capitalize"
        >
          Password
        </label>
        <input
          onChange={handleChangeInput}
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-700 text-black transition-all duration-300"
        ></input>
      </div>
      <div className="py-4">
        <button
          type="submit"
          className="w-full text-white tracking-wider focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-slate-700 hover:bg-slate-500 uppercase transition-all duration-200"
        >
          {loading ? 'Signing up...' : 'Register'}
        </button>
      </div>
      <div className="text-lg font-medium text-center text-gray-100">
        Already have an account?
        <a
          href="#"
          className="text-lg inline-block ml-2 text-blue-500 hover:underline w-full-text-right"
          onClick={() => handleClick('login')}
        >
          Log in
        </a>
      </div>
    </form>
  );
};

export default Signup;
