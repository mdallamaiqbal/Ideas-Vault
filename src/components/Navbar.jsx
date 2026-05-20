import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
    <div className='bg-base-100 shadow-sm'>
    <div className="navbar max-w-7xl mx-auto">
   <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      <li><Link href={'/'}>Home</Link></li>        
      <li><Link href={'/ideas'}>Ideas</Link></li>        
      <li><Link href={'/my-ideas'}>My Ideas</Link></li>        
      <li><Link href={'/add-ideas'}>Add Ideas</Link></li>        
      <li><Link href={'/my-interactions'}>My Interactions</Link></li> 
      </ul>
    </div>
    <a className="font-bold text-2xl">Ideas Vault</a>
  </div>
  <div className="navbar-center hidden md:flex">
    <ul className="menu menu-horizontal px-1 font-semibold">
      <li><Link href={'/'}>Home</Link></li>        
      <li><Link href={'/ideas'}>Ideas</Link></li>        
      <li><Link href={'/my-ideas'}>My Ideas</Link></li>        
      <li><Link href={'/add-ideas'}>Add Ideas</Link></li>        
      <li><Link href={'/my-interactions'}>My Interactions</Link></li>        
    </ul>
  </div>
  <div className="navbar-end">
   <ul className='font-semibold'>
     <li><Link href={'/login'}>Login</Link></li>
   </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;