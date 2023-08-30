'use client'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Nav = () => {
    const [toggleDropDown, setToggleDropdown] = useState(false);
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    },[])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image
                    src="/assets/images/logo.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>Promptopia</p>
            </Link>

            {/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>

                        <button 
                            type='button' 
                            className='outline_btn'
                            onClick={signOut}
                        >
                            Sign Out
                        </button>

                        <Link href='/profile'>
                            <Image
                                src={session?.user.image}
                                alt="Profile Image"
                                width={37}
                                height={37}
                                className='rounded-full'
                            />
                        </Link>

                    </div>

                ): (
                    <>
                        {providers && (
                            <button 
                                type='button' 
                                className='outline_btn'
                                onClick={signIn}
                            >
                                Sign In
                            </button>
                        )}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                <div className='flex'>
                    <Image
                        src={session?.user.image}
                        alt="Profile Image"
                        width={37}
                        height={37}
                        className='rounded-full'
                        onClick={() => setToggleDropdown(!toggleDropDown)}
                    />

                    {toggleDropDown && (
                        <div className='dropdown'>
                            <Link
                                href='/profile'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                My Profile
                            </Link>
                             
                            <Link
                                href='/create-prompt'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Create Prompt
                            </Link>

                            <button
                                type='button'
                                onClick={() => {
                                    setToggleDropdown(false);
                                }}
                                className='mt-5 w-full black_btn'
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </nav>
    )
}

export default Nav