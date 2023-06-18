import React from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState, AuthModalType } from '../atoms/authModalAtom';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: AuthModalType) => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  return (
    <form className="space-y-6 px-6 pb-4">
      <h3 className="text-xl tracking-wider text-center font-medium text-white cursor-default">
        Sign in to LeetClone
      </h3>
      <div>
        <label
          htmlFor="email"
          className="text-md font-medium block mb-2 text-gray-200 capitalize"
        >
          Your e-mail
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@domain.com"
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
          type="password"
          name="password"
          id="password"
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-700 text-black transition-all duration-300"
        ></input>
      </div>
      <button
        type="submit"
        className="w-full tracking-wider text-white focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-slate-700 hover:bg-slate-500 uppercase transition-all duration-200"
      >
        Login
      </button>
      <button className="flex w-full justify-end">
        <a
          href="#"
          className="text-md text-gray-100 hover:underline w-full-text-right"
          onClick={() => handleClick('forgotPassword')}
        >
          Forget password?
        </a>
      </button>
      <div className="text-lg font-medium text-center text-gray-100">
        Not registered yet?
        <a
          href="#"
          className="text-lg inline-block ml-2 text-blue-500 hover:underline w-full-text-right"
          onClick={() => handleClick('register')}
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default Login;
