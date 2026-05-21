"use client";
import React, { useEffect, useState,useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import EditCommentModal from '@/components/EditCommentModal';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal';

const IdeaDetailsPage = () => {
    const params = useParams();
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
        fetch(`http://localhost:5000/ideas/${id}`)
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
            text: commentText,
            date: new Date().toLocaleDateString()
        };

        try {
            const res = await fetch(`http://localhost:5000/ideas/${id}/comments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newComment)
            });

            if (res.ok) {
                setCommentText(""); 
                fetchIdeaDetails(); 
            } else {
                alert("Failed to add comment");
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        } finally {
            setIsCommentSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center mt-20 text-lg font-medium">Loading idea details...</div>;
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
        <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-md border border-gray-100 rounded-3xl">
           
            <Link href="/ideas" className="text-sm font-medium text-blue-600 hover:underline mb-6 inline-block">
                ← Back to Ideas Vault
            </Link>
          
            <div className="relative w-full h-96 mb-8 rounded-2xl overflow-hidden">
                <Image 
                    src={idea.imageUrl} 
                    alt={idea.ideaTitle} 
                    className="max-w-80 mx-auto object-cover"
                    priority
                    width={400}
                    height={200}
                />
            </div>
           
            <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                    {idea.category}
                </span>
                <div className="text-sm text-gray-500 space-y-1 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                    <span> By: {idea.authorEmail}</span>
                    <span> Date: {idea.postedDate}</span>
                    <span className="text-green-600 font-semibold">● {idea.status}</span>
                </div>
            </div>
           
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {idea.ideaTitle}
            </h1>

            <p className="text-lg text-gray-600 font-medium mb-6 italic pl-4">
                {idea.shortDescription}
            </p>

            <div className="prose max-w-none text-gray-700 leading-relaxed border-t pt-6 mb-12">
                <h3 className="text-xl font-bold mb-3 text-gray-800">Detailed Concept:</h3>
                <p>{idea.detailedDescription || "No detailed description provided for this idea yet."}</p>
            </div>

            <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Discussion ({idea.comments?.length || 0})
                </h3>
               
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
                            <div className="space-y-1">
                                <p className="text-gray-700 text-sm md:text-base leading-relaxed">{comment.text}</p>
                                <span className="text-xs text-gray-400 block">📅 {comment.date || "Just now"}</span>
                            </div>

                           
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => { setActiveComment(comment); setIsEditOpen(true); }}
                                    className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => { setActiveComment(comment); setIsDeleteOpen(true); }}
                                    className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}

                    {(!idea.comments || idea.comments.length === 0) && (
                        <p className="text-center text-gray-400 py-6 text-sm">No comments yet. Start the conversation!</p>
                    )}
                </div>
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