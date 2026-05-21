"use client";
import React, { useState } from 'react';

const EditCommentModal = ({ isOpen, onClose, ideaId, comment, refreshComments }) => {
   const [text, setText] = useState(comment?.text || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
           
            const res = await fetch(`http://localhost:5000/ideas/${ideaId}/comments/${comment.commentId}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            });

            if (res.ok) {
                refreshComments(); 
                onClose();       
            } else {
                alert("Failed to update comment");
            }
        } catch (err) {
            console.error("Error updating comment:", err);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Update Comment</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
                        placeholder="Edit your comment..."
                        required
                        disabled={isSubmitting}
                    />
                    
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:bg-blue-400"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default EditCommentModal;