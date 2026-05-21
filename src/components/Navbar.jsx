"use client"; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';

const Navbar = () => {
    const {data: session} = authClient.useSession();
    const user = session?.user;
     const handleSignOut =async()=>{
            await authClient.signOut();
    }
    const pathname = usePathname(); 
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Ideas', href: '/ideas' },
        { name: 'My Ideas', href: '/my-ideas' },
        { name: 'Add Ideas', href: '/add-ideas' },
        { name: 'My Interactions', href: '/my-interactions' },
    ];
   
    const activeClass = "text-blue-600 bg-blue-50 dark:bg-slate-800 font-bold md:bg-transparent md:text-blue-600 md:dark:text-blue-500";
    const inactiveClass = "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800 md:hover:bg-transparent";
    return (
        <div className='bg-base-100 dark:bg-slate-900  dark:border-slate-800 shadow-sm sticky top-0 z-50 transition-colors duration-300'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden text-gray-800 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white dark:bg-slate-900 
            border-gray-100 dark:border-slate-800 
            text-gray-800 dark:text-gray-200  rounded-box  mt-3 w-52 p-2 shadow gap-1"
                        >
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li key={link.href}>
                                        <Link 
                                            href={link.href}
                                            className={`${isActive ? activeClass : inactiveClass}`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <Link href="/" className="font-bold text-2xl text-gray-800 dark:text-white">
                        Ideas <span className="text-blue-600">Vault</span>
                    </Link>
                </div>

                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1 font-semibold gap-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.href}>
                                    <Link 
                                        href={link.href}
                                        className={`px-4 py-2 rounded-lg transition-all ${isActive ? activeClass : inactiveClass}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="navbar-end gap-1">
                  <ThemeToggle />
                    <ul className='font-semibold'>
                     {user ? <>
                         <ul className='flex gap-2 items-center'>
                             <li>
                            <Avatar>
                            <Avatar.Image referrerPolicy='no-referrer' alt="user name" src={user?.image} />
                            <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                          </li>
                           <li>
                         <Button onClick={handleSignOut} variant='danger' className={'rounded-none'}>Logout</Button>
                       </li>
                         </ul>
                      </> 
                     :
                     <>
                      <li>
                            <Link 
                                href={'/login'} 
                                className={`px-4 py-2 rounded-lg transition-all ${pathname === '/login' ? 'dark:text-blue-400 font-bold bg-blue-50 dark:bg-slate-800' : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
                            >
                                Login
                            </Link>
                        </li>
                     </>

                     }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;