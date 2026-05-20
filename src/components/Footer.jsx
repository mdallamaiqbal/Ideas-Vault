"use client";

import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 w-full bg-black text-white dark:bg-slate-950 dark:text-slate-300  border-gray-200 dark:border-slate-900 transition-colors duration-300">
      <div className="footer max-w-7xl mx-auto p-10 sm:footer-horizontal justify-between">
        <nav>
          <h6 className="footer-title opacity-80">Platform</h6>
          <Link href={"/ideas"} className="link link-hover text-white">Ideas</Link>
          <Link href={"/categories"} className="link link-hover text-white">Categories</Link>
          <Link href={"/add-ideas"} className="link link-hover text-white">Add Ideas</Link>
          <Link href={"/my-ideas"} className="link link-hover text-white">My Ideas</Link>
        </nav>

        <nav>
          <h6 className="footer-title opacity-80 text-white">Contact Info</h6>
          <a href="mailto:support@ideasvault.com" className="link link-hover flex items-center text-white gap-2">
            support@ideasvault.com
          </a>
          <a href="tel:+880123456789" className="link link-hover text-white flex items-center gap-2">
            +880 1822913954
          </a>
          <div className="flex items-center text-white gap-2 mt-1">
            Dhaka, Bangladesh
          </div>
        </nav>

        <nav>
          <h6 className="footer-title opacity-80 text-white">Social</h6>
          <div className="grid grid-flow-col gap-4 ">
            
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="link link-hover text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current text-white">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
    
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="link link-hover text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current text-white">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
        
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="link link-hover text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current text-white">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </div>

      <div className="  dark:border-slate-900 bg-black dark:bg-slate-950/50 text-white dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-10 py-6 flex flex-col text-white sm:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {currentYear} Ideas Vault. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="link link-hover text-xs text-white">Privacy Policy</Link>
            <Link href="/terms" className="link link-hover text-xs text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;