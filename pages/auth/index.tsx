import Navbar from '@/src/components/Navbar';
import React from 'react';

type AuthPageProps = {

};

const AuthPage:React.FC<AuthPageProps> = () => {
    return (
        <div className='bg-gradient-to-b from-gray-500 to-gray-800 h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
            </div>
        </div>
    )
}

export default AuthPage;