"use client";

import UpdateIdeaModal from '@/components/UpdateIdeaModal';
import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const MyIdeasPage = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [myIdeas, setMyIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedIdea, setSelectedIdea] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        if (!user?.email) return;

        const fetchMyIdeas = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${user.email}`
                );

                const data = await res.json();

                setMyIdeas(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyIdeas();

    }, [user?.email]);

    const handleDelete = async (id) => {

        const confirmDelete = confirm(
            "Are you sure you want to delete this idea?"
        );

        if (!confirmDelete) return;

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {

                const remainingIdeas = myIdeas.filter(
                    (idea) => idea._id !== id
                );

                setMyIdeas(remainingIdeas);
            }

        } catch (error) {
            console.log(error);
        }
    };
    const openUpdateModal = (idea) => {
        setSelectedIdea(idea);
        setIsModalOpen(true);
    };
    const handleUpdateSuccess = (updatedIdea) => {
        const updatedIdeas = myIdeas.map((idea) =>
            idea._id === updatedIdea._id ? updatedIdea : idea
        );
        setMyIdeas(updatedIdeas);
    };
    if (loading) {
        return (
            <div className='text-center mt-10'>
            <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto py-10 px-5'>

            <h1 className='text-3xl font-bold mb-8'>
                My Ideas
            </h1>

            {
                myIdeas.length === 0 ? (
                    <p>No ideas added yet.</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                        {
                            myIdeas.map((idea) => (

                                <div key={idea._id}
                                    className="group border border-gray-100 bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                                    <div>
                                        <div className="w-full h-48 overflow-hidden rounded-xl relative">
                                            <Image width={400} height={250} src={idea.imageUrl} alt={idea.ideaTitle}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                                            <span
                                                className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                                {idea.category}
                                            </span>
                                        </div>

                                        <h2
                                            className="text-xl font-bold mt-4 text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                           Title: {idea.ideaTitle}
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-500 line-clamp-3 leading-relaxed">
                                           <span className='text-black'>Short Description:</span> {idea.shortDescription}
                                        </p>
                                    </div>


                                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-50/80">
                                        <Button onClick={() => openUpdateModal(idea)}
                                            className="flex-1 bg-blue-50 text-blue-600 font-medium px-4 py-2.5 rounded-xl hover:bg-blue-600
                    hover:text-white active:scale-95 transition-all duration-200"
                                        >
                                            Update
                                        </Button>

                                        <Button onClick={() => handleDelete(idea._id)}
                                            className="bg-red-50 text-red-600 font-medium px-4 py-2.5 rounded-xl hover:bg-red-600
                    hover:text-white active:scale-95 transition-all duration-200"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                )}
            {isModalOpen && selectedIdea && (
                <UpdateIdeaModal idea={selectedIdea} onClose={() => setIsModalOpen(false)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}

        </div>
    );
};

export default MyIdeasPage;