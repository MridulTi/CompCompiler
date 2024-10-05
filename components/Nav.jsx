"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useApp } from "@context/AppProviders";
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import { useError } from "@context/ErrorContext";
import { signOutFunction } from "@utils/helpers.js";
import { LuUserCircle } from "react-icons/lu";

export const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // (async () => {
    //   const res = await getProviders();
    //   setProviders(res);
    // })();
    const setProvider=async()=>{
      const response=await getProviders();
      setProviders(response)
    }

    setProvider()
  }, []);

  return (
    <nav className='fixed top-0 flex justify-between w-screen mb-16 pt-3 px-12'>
      <Link href='/' className='flex gap-2 flex-center'>
        {/* <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        /> */}
        <p className='font-extrabold text-white text-xl'>Compile-<b className="tracking-widest">CLASH</b></p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/host-comp' className='bg-black p-2 text-white'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline outline-1 hover:bg-black hover:text-white outline-black p-2 px-4'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <div className="flex gap-4 items-center ">
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='hover:bg-gray-700  p-2 px-6 rounded-lg font-semibold text-white'
                >
                  Log In
                </button>
                <button
                  type='button'
                  key={provider.name}
                  
                  className='bg-white p-2 hover:bg-black hover:text-white px-6 rounded-lg font-semibold'
                >
                  Sign Up
                </button>
                </div>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown((prev)=>!prev)}
            />

            {toggleDropdown && (
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
                    signOut();
                  }}
                  className='mt-5 w-full bg-black p-2 text-white'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='bg-black p-2 text-white'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export const AuthNav=()=>{
  return(
    <nav className='fixed top-0 z-20 flex shadow-md justify-between w-screen bg-white mb-16 py-3 px-12'>
    <Link href='/' className='flex gap-2 flex-center'>
      {/* <Image
        src='/assets/images/logo.svg'
        alt='logo'
        width={30}
        height={30}
        className='object-contain'
      /> */}
      <p className='font-extrabold text-black text-xl'>Compile-<b className="tracking-widest">CLASH</b></p>
    </Link>
    </nav>
  )
}

export const DashNav=()=>{
  const {setHostModal}=useError();
  const {userCred}=useApp();
  const url=usePathname();
  return(
    <nav className='fixed top-0 z-20 flex shadow-md justify-between items-center w-screen bg-white mb-16 py-3 px-12'>
    <Link href='/code/participate/' className='flex gap-2 flex-center'>
      {/* <Image
        src='/assets/images/logo.svg'
        alt='logo'
        width={30}
        height={30}
        className='object-contain'
      /> */}
      <p className='font-extrabold text-black text-xl'>Compile-<b className="tracking-widest">CLASH</b></p>
    </Link>
    <div className="flex items-center justify-between gap-6">
      {url.includes("host-comp")?(<Link href="/code/participate/"><Button>Join a Comp</Button></Link>):(<Button onClick={setHostModal}>Host A CodeComp</Button>)}
      <Menu>
        <MenuHandler className="cursor-pointer">
          {userCred!=undefined?(userCred?.photoURL && <Avatar src={userCred.photoURL} alt="Photo URL" size="sm" />):(
            <LuUserCircle className="text-5xl text-gray-500" />
          )}
        </MenuHandler>
        <MenuList className="flex flex-col gap-2">
          <Link href="/code/profile" className="outline-0"><MenuItem className="bg-green-300 w-full text-center text-white">My Profile</MenuItem></Link>
          <MenuItem className="bg-red-600 w-full text-center text-white">Log Out</MenuItem>
        </MenuList>
      </Menu>
    </div>
     
    </nav>
  )
}
