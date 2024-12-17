import React from "react";

const ParticipantList = ({ participants }) => {
  return (
    <div className="p-5 flex-1 flex flex-col overflow-hidden">
      <h2 className="mb-4 text-lg font-medium">KATILIMCILAR</h2>
      <div className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr] gap-2 items-center font-bold border-b-2 border-gray-300 bg-gray-50 py-2">
        <span>#</span>
        <span>Participant Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Status</span>
        <span>Quick Actions</span>

      </div>

      <div className="flex-1 overflow-y-auto bg-white border border-gray-300 rounded">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="grid grid-cols-[40px_2fr_1fr_1fr_1fr_1fr] gap-2 items-center py-3 border-b border-gray-200 text-sm hover:bg-gray-50 transition"
          >
            <span>{index + 1}</span>
            <span className="truncate">{participant.name}</span>
            <span className="truncate">{participant.email}</span>
            <span>{participant.phone}</span>
            <span>{participant.status}</span>
            <div className="flex gap-1">
                  <button
                    className="bg-gray-50 border border-blue-700 text-blue-700 rounded text-xs px-2 py-1 hover:bg-blue-700 hover:text-white"
                    onClick={() => handleView(participant)}
                  >
                    View
                  </button>
                  <button className="bg-gray-50 border border-cyan-600 text-cyan-600 rounded text-xs px-2 py-1 hover:bg-cyan-600 hover:text-white">
                    Edit 
                  </button>
                  <button
                    className="bg-gray-50 border border-red-600 text-red-600 rounded text-xs px-2 py-1 hover:bg-red-600 hover:text-white"
                    onClick={() => handleDelete(participant.id)}
                  >
                    Delete
                  </button>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantList;