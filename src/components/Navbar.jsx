

"use client"
import React, { useContext } from 'react';
import {  Disclosure, DisclosureButhrefn, DisclosureButton, DisclosurePanel, Menu, MenuButhrefn, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react";
// import { context } from "./Authentication";
import { CgProfile } from "react-icons/cg";
import { getAuth, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { BsCart4 } from "react-icons/bs";
import { context } from './Authentication';
// import Home from "./Home";

// // 
// import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: 'about', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
// 



const navLinks = [
  { path: '/', name: 'Home' },
  { path: 'about', name: 'About' },
  { path: '/services', name: 'Services' },
  { path: '/contact', name: 'Contact' },
];


const Navbar = () => {


    const { user, setLoading, loading,setSearchText } = useContext(context)
    const auth = getAuth();
    const handleSignOUt = () => {
      signOut(auth).then(() => {
  
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully SignOut",
          showConfirmButhrefn: false,
          timer: 1500
        });
        setLoading(!loading)
  
      })
    }
    const [searchData, setSearch] = useState()
  
    const handleSearch = e => {
      e.preventDefault()
      const search = e.target.value
      console.log(search)
      // setSearch(search)
      setSearchText(search)
  
   

  
    }

function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
    return (
       
        <Disclosure as="nav" className="bg-gray-800 z-20  text-white">
        <div className="mx-auto  max-w-7xl px-2 sm:px-6  lg:px-8">
          <div className="relative  flex h-16 items-center justify-between">
            <div className="absolute  inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative  inline-flex items-center justify-center rounded-md p-2 w-min text-gray-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block   h-7 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden  h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://i.ibb.co/D4g9cNP/e-commerece-logo.jpg"
                  className="h-8 lg:block md:block hidden w-auto"
                />
                <img
                  alt="Your Company"
                  src="https://i.ibb.co/D4g9cNP/e-commerece-logo.jpg"
                  className="h-8 absolute left-[45px] md:hidden lg:hidden block w-auto"
                />
              </div>
              {/* search input */}
              <div className='w-[40%] h-[40px]  lg:hidden md:hidden block pt-2 mx-auto'>
                <div className="relative flex items-center w-full h-[30px]   rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
  
                  <input onChange={handleSearch}
                    className="peer h-[40px] w-full outline-none text-[8px] text-gray-700  text-left "
                    type="text"
                    id="search"
                    name="search"
  
                    placeholder="Search something.." />
                </div>
              </div>
  
              {/* search input end  */}
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navLinks.map((link, index) => (
  
                    <a key={index}
                      href={link.path}
                      className={({ isActive }) =>
                        isActive ? "text-gray-400  hover:border-solid hover:border underline-offset-4 underline hover:border-white border-solid border-transparent border box-border w-full p-3 font-semibold" : "w-full hover:border-solid hover:border-white hover:text-gray-400 hover:border border border-transparent box-border p-3"
                      }
                    >
                      {link.name}
                    </a>
  
                  ))}
                </div>
              </div>
            </div>
  
  
            {/* search input */}
            <div className='md:w-[25%] lg:w-[40%] h-[40px] lg:block md:block hidden  pt-[5px] mx-auto'>
              <div className="relative flex items-center w-full h-[30px]   rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="lg:h-5 lg:w-5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
  
                <input onChange={handleSearch}
                  className="peer h-[40px] w-full outline-none md:text-[12px] lg:text-[16px] text-gray-700  text-left "
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search something.." />
              </div>
            </div>
  
            {/* search input end  */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative w-8 rounded-full bg-gray-800  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BsCart4 aria-hidden="true" className="h-6 w-6" />
              </button>
  
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div className="  w-8">
                  <MenuButton className="relative flex rounded-full lg:w-9 w-7 bg-gray-800  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5 " />
                    <span className="sr-only">Open user menu</span>
                    {user ? <img
                      alt=""
                      src={`${user?.photoURL}`}
                      className="h-full w-full rounded-full"
                    /> : <CgProfile className="h-8 w-10  rounded-full text-gray-400" />
                    }
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    {user ? <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Your Profile
                    </a> : <span></span>}
                  </MenuItem>
                  {/* <MenuItem>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Settings
                      </a>
                    </MenuItem> */}
                  <MenuItem>
                    {user ? <a onClick={handleSignOUt} href="#" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Sign out
                    </a> : <a href="login" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Sign In
                    </a>}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
  
        <DisclosurePanel className="sm:hidden   w-1/2">
          <div className="space-y-1  px-2 pb-3 pt-2">
            {navLinks.map((link) => (
  
              <DisclosureButton
                key={link.name}
  
                href={link.path}
                className="block mx-auto w-5 "
              >
  
                <a href={link.path} className={({ isActive }) => isActive ? 'text-gray-400  underline underline-offset-4 font-semibold ' : ' font-semibold text-white'}>
  
                  {link.name}
  
                </a>
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    );
};

export default Navbar;