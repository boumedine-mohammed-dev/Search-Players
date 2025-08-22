'use client'
import React from 'react'
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Image from 'next/image';
function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    console.log(session)
    console.log(session?.user?.image)
    return (
        <div className='flex justify-between p-4' >
            <Image src='/image/logo.png' width={100} height={100} />
            <div className='flex items-center gap-3'>
                {!session ? <button onClick={() => { signIn(); }} className='bg-black text-white rounded-full p-3 cursor-pointer'>Sign in</button> : <button onClick={() => { signOut(); }} className='bg-black text-white rounded-full p-3 cursor-pointer'>Sign out</button>}
                <button className='bg-orange-500 text-black rounded-full p-3 cursor-pointer' onClick={() => { !session ? signIn() : router.push("/create-post") }} > <span className='hidden sm:block' >Creat Post</span> <MdOutlinePlaylistAdd className='block sm:hidden text-[30px]' /></button>
                <Image onClick={() => { !session ? signIn() : router.push("/Profile") }} src={session?.user?.image || "/image/profile.png"} width={50} height={50} alt='photo' className='rounded-full cursor-pointer ' />
            </div>
        </div>
    )
}

export default Header
