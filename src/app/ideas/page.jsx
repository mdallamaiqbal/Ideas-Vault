"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const IdeasPage = () => {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/ideas')
            .then(res => res.json())
            .then(data => setIdeas(data))
            .catch(err => console.error("Error:", err));
    }, []);
    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-2 text-gray-800'>Startup Ideas Vault</h2>
            <p className='text-center text-gray-500 mb-8'>Explore innovative concepts shared by our community members</p>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {ideas.map((idea) => (
                    <div key={idea._id} className="bg-white shadow-md hover:shadow-xl border border-gray-100 rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300">
                        <div>
                           
                           <div>
                             <Image 
                                src={idea.imageUrl } 
                                alt={idea.ideaTitle} 
                                width={200}
                                height={200}
                                className="w-40 h-40 mx-auto object-cover"
                            />
                           </div>
                            
                            <div className="p-6 pb-0">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                                       {idea.category}
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium">
                                       By: {idea.authorEmail}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                                    {idea.ideaTitle}
                                </h3>
                                
                                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                                    {idea.shortDescription}
                                </p>
                            </div>
                        </div>
                        
                        <div className="p-6 pt-4">
                            <div className="flex justify-between items-center text-xs text-gray-400 mb-4 border-t pt-3">
                                <span>{idea.postedDate}</span>
                                <span className="text-green-600 font-semibold">● {idea.status}</span>
                            </div>
                            
                            <Link href={`/ideas/${idea._id}`} className="w-full text-center block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition duration-200">
                                View Details
                            </Link>
                        </div>

                    </div>
                ))}
            </div>
            
            {ideas.length === 0 && (
                <p className='text-center text-gray-500 mt-12 text-lg'>No ideas found. Be the first to share your startup concept!</p>
            )}
        </div>
    );
};

export default IdeasPage;