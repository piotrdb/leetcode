import React from 'react';
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  return (
    <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8">
      <h3 className="text-xl font-medium text-center tracking-wider text-white">
        Reset Password
      </h3>
      <p className="text-sm text-white ">
        Forgotten your password? Enter your e-mail address below, and we`ll send
        you an e-mail allowing you to reset it.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-md font-medium block mb-2 text-gray-200 capitalize"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-200 border-gray-700 text-black transition-all duration-300"
          placeholder="name@company.com"
        />
      </div>

      <button
        type="submit"
        className="w-full tracking-wider text-white focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-slate-700 hover:bg-slate-500 uppercase transition-all duration-200"
      >
        Reset Password
      </button>
    </form>
  );
};
export default ResetPassword;
