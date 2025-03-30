// src/components/modals/CreateEventModal.js
import React, { useState } from "react";

export default function CreateEventModal({ isOpen, onClose, onSubmit }) {
  // Always call hooks at the top, regardless of isOpen
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("tech");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Conditionally render nothing if the modal is closed
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      date,
      startTime,
      endTime,
      category,
      location,
      description,
    });
    // Reset form values (optional)
    setTitle("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setCategory("tech");
    setLocation("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                className="w-full border border-gray-300 p-2 rounded"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                className="w-full border border-gray-300 p-2 rounded"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="ERC">ERC</option>
              <option value="TL">TL</option>
              <option value="AERO">AERO</option>
              <option value="CHEMETL">CHEMETL</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 rounded border"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
