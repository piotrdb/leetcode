import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NavbarProps = {

};

const Navbar:React.FC<NavbarProps> = () => {
    return (
        <div className='flex items-center justify-between sm:px-12 px-2 md:px-24 bg-slate-50 bg-opacity-20 rounded-b-lg'>
            <Link href="/" className='flex items-center justify-center h-28'>
                <Image width={250} height={200} src="/logo.png" alt="LeetClone" className='h-full transition-all duration-300 hover:scale-110'/>
            </Link>
            <div className="flex items-center">
                <button 
                    className='text-xl uppercase  tracking-wider bg-brand-orange text-white sm:px-4 md:px-12 py-2 
                    rounded-xl text-l font-medium border-2 border-transparent transition-all duration-300
                  hover:bg-brand-orange-h hover:border-2 hover:border-brand-orange-h hover:scale-110 hover:rounded-md'>
                        Sign in
                </button>
            </div>
        </div>
    )
}

export default Navbar;