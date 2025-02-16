
'use client';

import { useParams } from 'next/navigation';
import React from 'react';

const ProfilePage = () => {
    const { id } = useParams();

    return (
        <div  className=" flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <p className="text-4xl">
                Profile page
                <span className='text-black p-2 rounded-xl bg-white'>{id}</span>
            </p>
        </div>
    );
};

export default ProfilePage;
