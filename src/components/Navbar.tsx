import React from 'react';
import Link from 'next/link';

type NavbarProps = {

};

const Navbar:React.FC<NavbarProps> = () => {
    return (
        <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
            <Link href="/" className='flex items-center justify-center h-28'>
                <img src="/logo.png" alt="LeetClone" className='h-full'/>
            </Link>
            <div className="flex items-center">
                <button 
                    className='bg-brand-orange tex-withre px-2 py-2 sm:px-4
                    rounded-md text-l font-medium border-2 border-transparent transition duration-300 ease-in-out
                    hover:text-white hover:bg-brand-orange-s hover:border-2 hover:border-brand-orange-s'>
                        Sign in
                </button>
            </div>
        </div>
    )
}

export default Navbar;