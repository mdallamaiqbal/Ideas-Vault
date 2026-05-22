"use client";
import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-8 md:p-12 shadow-md border border-gray-100 rounded-3xl">
                
                <div className="inline-flex items-center justify-center bg-red-50 text-red-600 font-bold text-sm px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Error 404
                </div>

                
                <h1 className="text-7xl md:text-8xl font-black text-gray-900 tracking-tight animate-pulse">
                    404
                </h1>

                
                <div className="space-y-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        The idea or concept you are looking for does not exist, or the link has been moved to another vault.
                    </p>
                </div>

               
                <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>

               
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Link 
                        href="/ideas" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition shadow-sm text-center"
                    >
                        Back to Vault
                    </Link>
                    <Link 
                        href="/" 
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl text-sm transition text-center"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>

           
            <p className="mt-8 text-xs text-gray-400">
                Lost? Contact support if you think this is a server error.
            </p>
        </div>
    );
};

export default NotFoundPage;