"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const IdeasPage = () => {
    const [ideas, setIdeas] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    
   useEffect(() => {
        
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?search=${searchText}&category=${selectedCategory}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setIdeas(data);
            })
            .catch(err => {
                console.error("Error:", err);  
            });
    }, [searchText, selectedCategory]);
    return (
        <div className='max-w-7xl mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-2 text-gray-800'>Startup Ideas Vault</h2>
            <p className='text-center text-gray-500 mb-8'>Explore innovative concepts shared by our community members</p>
            <div className='flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100'>
                
                <div className='w-full md:w-1/2'>
                    <input 
                        type="text" 
                        placeholder="Search by idea title..." 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    />
                </div>

               
                <div className='w-full md:w-1/3'>
                    <select 
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700'
                    >
                        <option value="all">All Categories</option>
                        <option value="Tech">Tech</option>
                        <option value="AI">Artificial Intelligence (AI)</option>
                        <option value="Health">Health & Medical</option>
                        <option value="Education">EdTech / Education</option>
                        <option value="Fintech">Fintech / Finance</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Sustainability">Sustainability / Green Tech</option>
                    </select>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {ideas.map((idea) => (
                    <div key={idea._id} className="bg-white shadow-md hover:shadow-xl border border-gray-100 rounded-2xl overflow-hidden flex flex-col justify-between transition duration-300">
                        <div>
                           <div className='py-5 bg-gray-50'>
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
                                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-1 rounded-md">
                                       {idea.category}
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">
                                       By: {idea.authorEmail}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                                   Title: {idea.ideaTitle}
                                </h3>
                                
                                <p className="text-gray-600 text-md font-medium mt-2 line-clamp-3">
                                   Description: {idea.shortDescription}
                                </p>
                            </div>
                        </div>
                        
                        <div className="p-6 pt-4">
                            <div className="flex justify-between items-center text-xs text-gray-400 mb-4 pt-1">
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