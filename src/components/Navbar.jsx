"use client"; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname(); 
  
    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Ideas', href: '/ideas' },
        { name: 'My Ideas', href: '/my-ideas' },
        { name: 'Add Ideas', href: '/add-ideas' },
        { name: 'My Interactions', href: '/my-interactions' },
    ];
   
    const activeClass = "text-blue-600 bg-blue-50 font-bold md:bg-transparent md:text-blue-600";
    const inactiveClass = "text-gray-600 hover:text-blue-600 hover:bg-gray-100 md:hover:bg-transparent";
    return (
        <div className='bg-base-100 shadow-sm sticky top-0 z-50'>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> 
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-1"
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
                    <Link href="/" className="font-bold text-2xl tracking-tight text-gray-800">
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

                <div className="navbar-end">
                    <ul className='font-semibold'>
                        <li>
                            <Link 
                                href={'/login'} 
                                className={`px-4 py-2 rounded-lg transition-all ${pathname === '/login' ? 'text-blue-600 font-bold' : 'text-gray-600'}`}
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;