import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState, AuthModalType } from '../../atoms/authModalAtom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import router from 'next/router';
import { toast } from 'react-toastify';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: AuthModalType) => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return toast.error('In order to sign in please fill all fields', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    }
    try {
      const user = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!user) return;
      router.push('/');
    } catch (error: any) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
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
    <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
      <h3 className="text-xl text-center font-medium text-white cursor-default">
        Sign in to our platform
      </h3>
      <div>
        <label
          htmlFor="email"
          className="text-md font-medium block mb-2 text-gray-200"
        >
          Your e-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@domain.com"
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[rgb(45,45,45)] border-gray-700 placeholder-gray-300 text-gray-100 transition-all duration-300"
          onChange={handleChangeInput}
        ></input>
      </div>
      <div>
        <label
          htmlFor="password"
          className="text-md font-medium block mb-2 text-gray-200"
        >
          Your password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[rgb(47,47,47)] border-gray-700 placeholder-gray-300 text-gray-100 transition-all duration-300"
          onChange={handleChangeInput}
        ></input>
      </div>
      <button className="flex w-full justify-end">
        <a
          href="#"
          className="text-md text-gray-100 hover:underline hover:text-blue-500 w-full-text-right"
          onClick={() => handleClick('forgotPassword')}
        >
          Lost password?
        </a>
      </button>
      <button
        type="submit"
        className="w-full text-white focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center bg-slate-700 hover:bg-slate-600 hover:shadow-2xl transition-all duration-200"
      >
        {loading ? 'Signing in...' : 'Login to your account'}
      </button>

      <div className="text-md font-medium text-center text-gray-100">
        Not registered yet?
        <a
          href="#"
          className="text-md inline-block ml-2 text-blue-500 hover:underline w-full-text-right"
          onClick={() => handleClick('register')}
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default Login;
