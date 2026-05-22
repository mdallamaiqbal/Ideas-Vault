"use client";

import React, { useState } from 'react';
import toast from 'react-hot-toast';
const UpdateIdeaModal = ({ idea, onClose, onUpdateSuccess }) => {
    const [ideaTitle, setTitle] = useState(idea?.ideaTitle
|| "");
    const [category, setCategory] = useState(idea?.category || "");
    const [shortDescription, setShortDescription] = useState(idea?.shortDescription || "");
    const [imageUrl, setImageUrl] = useState(idea?.imageUrl || "");
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const updatedData = { ideaTitle, category, shortDescription, imageUrl };
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${idea._id}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();

          
            if (res.ok) {
               toast.success("Idea updated successfully!");
                onUpdateSuccess({ ...idea, ...updatedData }); 
                onClose();
            } else {
               toast.error("Something went wrong!");
            }
        } catch (error) {
            console.error("Error updating idea:", error);
           toast.error("Failed to update idea.");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Idea</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={ideaTitle}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500 text-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500 text-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-500 text-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                        <textarea
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 h-24 focus:outline-blue-500 text-black"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            disabled={updating}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            disabled={updating}
                        >
                            {updating ? "Updating..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateIdeaModal;