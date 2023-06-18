import React from 'react';

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  return (
    <form className="space-y-6 px-6 pb-4">
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
          type="displayName"
          name="displayName"
          id="displayName"
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
      <div className="py-4">
        <button
          type="submit"
          className="w-full text-white tracking-wider focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-slate-700 hover:bg-slate-500 uppercase transition-all duration-200"
        >
          Register
        </button>
      </div>
      <div className="text-lg font-medium text-center text-gray-100">
        Already have an account?
        <a
          href="#"
          className="text-lg inline-block ml-2 text-blue-500 hover:underline w-full-text-right"
        >
          Log in
        </a>
      </div>
    </form>
  );
};

export default Signup;
