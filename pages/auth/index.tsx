import Navbar from '@/src/components/Navbar';
import React from 'react';
import Image from 'next/image';

type AuthPageProps = {

};

const AuthPage:React.FC<AuthPageProps> = () => {
    return (
        <div className='bg-gradient-to-b from-gray-500 to-gray-800 h-screen relative'>
            <div className='max-w-7xl mx-auto'> 
                <Navbar />
                <div className='flex items-center justify-center h-[calc(100vh-7rem)] pointer-events-none select-none'>
                    <Image width='1000' height = '1' src="/hero.png" alt="hero img"/>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;