"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TrendingIdeas = () => {
    const [trendingIdeas, setTrendingIdeas] = useState([]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/trending-ideas`)
            .then(res => res.json())
            .then(data => setTrendingIdeas(data))
            .catch(err => console.error("Error fetching trending ideas:", err));
    }, []);

    return (
        <div className='max-w-7xl mx-auto px-4 py-16 bg-gray-50/50 rounded-3xl my-10'>
            <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3'>
                    🔥 Trending Startup Ideas
                </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
                {trendingIdeas.map((idea) => (
                    <div 
                        key={idea._id} 
                        className='flex flex-col justify-between bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-[360px] h-[480px] overflow-hidden'
                    >
                        <div>
                            <div className="relative w-full h-40 flex items-center justify-center bg-gray-50 rounded-2xl p-4 overflow-hidden flex-shrink-0 mb-4">
                                <Image
                                    src={idea.imageUrl}
                                    alt={idea.ideaTitle}
                                    className="object-cover rounded-xl"
                                    priority
                                    sizes="(max-w-7xl) 33vw, 100vw"
                                    fill
                                />
                            </div>
                            <div className='mb-3'>
                                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full inline-block tracking-wide">
                                    {idea.category}
                                </span>
                            </div>
                              <div className='flex justify-between items-center mb-3'>
                                <span className='text-[10px] text-gray-400 uppercase tracking-wider'>Status</span>
                                <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                                    ● {idea.status}
                                </span>
                             </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2  leading-snug">
                               Title: {idea.ideaTitle}
                            </h3>

                            <p className="text-xs md:text-sm text-gray-500 font-medium line-clamp-3  overflow-hidden ">
                              <span className='text-black'>Short Description: </span>{idea.shortDescription}
                            </p>
                        </div>

                        <div className='pt-3 border-gray-50'>
                            <Link 
                                href={`/ideas/${idea._id}`} 
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition duration-200"
                            >
                               View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {trendingIdeas.length === 0 && (
                <p className='text-center text-gray-400 py-12 text-sm'>No trending ideas available right now.</p>
            )}
        </div>
    );
};

export default TrendingIdeas;