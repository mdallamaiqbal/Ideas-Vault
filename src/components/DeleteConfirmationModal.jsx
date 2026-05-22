"use client";
import React, { useState } from 'react';
import toast from 'react-hot-toast';
const DeleteConfirmationModal = ({ isOpen, onClose, ideaId, commentId, refreshComments }) => {
   const [isDeleting, setIsDeleting] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        if (isDeleting) return;
        
        setIsDeleting(true);
        try {
           
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${ideaId}/comments/${commentId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                refreshComments(); 
                onClose(); 
                toast.success("Deleted")     
            } else {
               toast.error("Failed to delete comment");
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <div>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl text-center animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                    ⚠️
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure?</h3>
                <p className="text-sm text-gray-500 mb-6">
                    Do you really want to delete this comment? This action cannot be undone.
                </p>
                
                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition w-full"
                        disabled={isDeleting}
                    >
                        No, Keep it
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-xl transition w-full disabled:bg-red-400"
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default DeleteConfirmationModal;