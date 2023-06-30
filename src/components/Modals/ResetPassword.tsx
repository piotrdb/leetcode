import { auth } from '@/src/firebase/firebase';
import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success) {
      toast.success('E-mail was sent', {
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
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleReset}
    >
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
          className="border-2 outline-none sm:text-sm md:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[rgb(47,47,47)] border-gray-700 placeholder-gray-300 text-gray-100 transition-all duration-300"
          placeholder="name@company.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full tracking-wider text-white focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center bg-slate-700 hover:bg-slate-600 hover:shadow-2xl transition-all duration-200"
      >
        Reset your password
      </button>
    </form>
  );
};
export default ResetPassword;
