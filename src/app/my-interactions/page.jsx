"use client";

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const MyInteractions = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.email) return;

        const fetchInteractions = async () => {
            const res = await fetch(`http://localhost:5000/comments-on-my-ideas/${user.email}`);
            const data = await res.json();
            setInteractions(data);
            setLoading(false);
        };

        fetchInteractions();
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading your activities...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-5">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Interactions</h1>
                <p className="text-gray-500 mt-2">Track your activity, feedback, and discussions across the platform.</p>
            </div>

            {interactions.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-2xl">
                    <p className="text-gray-500 font-medium">You have not commented on any ideas yet.</p>
                    <Link href="/ideas" className="mt-4 inline-block bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                        Explore Ideas
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Commented Ideas ({interactions.length})
                    </h2>
                    
                    {interactions.map((item) => (
                        <div 
                            key={item._id} 
                            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                           
                            <div className="flex flex-col sm:flex-row gap-4 items-start pb-4 border-b border-gray-50">
                                <div className="w-full flex items-center sm:w-24 h-20 relative rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                    <Image 
                                        src={item.imageUrl} 
                                        alt={item.title || "Idea Image"}
                                       width={150}
                                        height={150}
                                        
                                        className="object-cover w-16 mx-auto"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
                                        {item.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition">
                                        <Link href={`/ideas/${item._id}`}>{item.title}</Link>
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{item.shortDescription}</p>
                                </div>
                            </div>

                           
                            <div className="mt-4 space-y-3">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your Comments:</h4>
                                
                                {item.comments?.map((comment, index) => (
                                    <div 
                                        key={comment.commentId || index} 
                                        className="bg-gray-50 rounded-xl p-3 border border-gray-100/70"
                                    >
                                        
                                        <p className="text-sm text-gray-700">
                                            {comment.text}
                                        </p>
                                        {comment.authorEmail && (
                                                <span className="text-[11px] text-gray-400 font-medium">
                                                    By: {comment.authorEmail}
                                                </span>
                                            )}
                                        {comment.createdAt && (
                                            <span className="block text-[11px] text-gray-400 mt-1.5 text-right">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyInteractions;