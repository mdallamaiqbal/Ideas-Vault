"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import EditCommentModal from '@/components/EditCommentModal';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const IdeaDetailsPage = () => {
    const params = useParams();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const id = params?.id;

    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);


    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [activeComment, setActiveComment] = useState(null);


    const fetchIdeaDetails = useCallback(() => {
        if (!id) return;
        setLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`)
            .then((res) => {

                if (!res.ok) {
                    throw new Error("Idea not found on server");
                }
                return res.json();
            })
            .then((data) => {
                setIdea(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching idea details:", err);
                setIdea(null);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchIdeaDetails();
        }
    }, [id, fetchIdeaDetails]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim() || isCommentSubmitting) return;

        setIsCommentSubmitting(true);
        const newComment = {
            commentId: Date.now().toString(),
            authorEmail: user?.email,
            text: commentText,
            date: new Date().toLocaleDateString()
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}/comments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });

            if (res.ok) {
                setCommentText("");
                fetchIdeaDetails();
                toast.success("New comment add")
            } else {
                toast.error("Failed to add comment");
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        } finally {
            setIsCommentSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-20 text-lg font-medium"><span className="loading loading-spinner loading-xl"></span></div>;
    }

    if (!idea) {
        return (
            <div className="text-center mt-20">
                <p className="text-red-500 text-xl font-semibold">Idea not found!</p>
                <Link href="/ideas" className="text-blue-600 underline mt-4 inline-block">Back to Vault</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto my-12 p-6 bg-white shadow-md border border-gray-100 rounded-3xl">

            <Link href="/ideas" className="text-sm font-medium text-blue-600 hover:underline mb-6 inline-block">
                ← Back to Ideas Vault
            </Link>
            <div className='flex flex-col min-w-full md:min-w-4xl gap-8 lg:gap-16 items-start bg-white p-6 md:p-8 rounded-3xl shadow-sm'>
                
            <div className="relative w-full flex items-center bg-gray-50 rounded-2xl p-5 overflow-hidden">
                <Image
                    src={idea.imageUrl}
                    alt={idea.ideaTitle}
                    className="max-w-80 mx-auto object-cover"
                    priority
                    width={350}
                    height={250}
                />
            </div>
             <div className="flex-1 w-full pt-2">
             <div className='mb-5'>
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {idea.category}
                </span>
                <h3 className='mt-5'> By: {idea.authorEmail}</h3>
             </div>
            <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
                <div className="text-sm text-gray-500 space-y-1 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                    
                    <span> Date: {idea.postedDate}</span>
                    <span className="text-green-600 font-semibold">● {idea.status}</span>
                </div>
            </div>

            <h1 className="text-xl md:text-2xl  font-bold text-gray-900 mb-4">
             Title: {idea.ideaTitle}
            </h1>

            <p className="text-lg text-gray-600 font-medium mb-2 ">
              <span className='text-gray-800 text-wrap'> Short Description:</span> {idea.shortDescription}
            </p>

             <div className="text-gray-700 leading-relaxed  pt-6 mb-6 items-center">
                <p className='text-wrap text-lg'> <span className="text-xl font-bold text-gray-800">Detailed Concept: </span>{idea.detailedDescription}</p>
             </div>
              </div>
              </div>
               <div>

                <h3 className="text-2xl font-bold text-gray-800 mt-4 mb-6">
                    Discussion ({idea.comments?.length })
                </h3>
             </div>
                <form onSubmit={handleCommentSubmit} className="mb-8">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Share your thoughts or feedback about this idea..."
                        className="w-full border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                        required
                        disabled={isCommentSubmitting}
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-xl text-sm transition disabled:bg-blue-400"
                            disabled={isCommentSubmitting}
                        >
                            {isCommentSubmitting ? "Posting..." : "Post Comment"}
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    {idea.comments?.map((comment) => (
                        <div key={comment.commentId} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl flex justify-between items-start transition hover:bg-gray-100/50">
                            <div className="space-y-1 flex flex-col items-start">
                                <span className="text-blue-600 bg-blue-50  py-0.5 rounded-md font-medium">
                                    By: {comment.authorEmail}
                                </span>
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{comment.text}</p>
                                <span className="text-xs text-gray-400 block">📅 {comment.date || "Just now"}</span>
                            </div>

                            {user?.email === comment.authorEmail && (
                                <div className="flex gap-2 ml-4 ">
                                    <button
                                        onClick={() => { setActiveComment(comment); setIsEditOpen(true); }}
                                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => { setActiveComment(comment); setIsDeleteOpen(true); }}
                                        className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {(!idea.comments || idea.comments.length === 0) && (
                        <p className="text-center text-gray-400 py-6 text-sm">No comments yet. Start the conversation!</p>
                    )}
                </div>
            

            {isEditOpen && (
                <EditCommentModal
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    ideaId={id}
                    comment={activeComment}
                    refreshComments={fetchIdeaDetails}
                />
            )}

            {isDeleteOpen && (
                <DeleteConfirmationModal
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    ideaId={id}
                    commentId={activeComment?.commentId}
                    refreshComments={fetchIdeaDetails}
                />
            )}
        </div>
    );
};

export default IdeaDetailsPage;