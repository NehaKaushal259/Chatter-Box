import React from 'react'
import { FaTimes } from "react-icons/fa";

function Request(onClose, requests) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-gray-800 text-white p-6 rounded-xl w-[400px] shadow-lg">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Friend Requests ❤️</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Requests List */}
        <div className="space-y-3">

          {requests.length === 0 ? (
            <p className="text-gray-400 text-center">No requests</p>
          ) : (
            requests.map((r) => (
              <div
                key={r.id}
                className="flex justify-between items-center bg-gray-700 p-3 rounded"
              >
                <span>{r.from_user.name}</span>

                <div className="flex gap-2">
                  <button className="bg-green-500 px-2 py-1 rounded">
                    Accept
                  </button>
                  <button className="bg-red-500 px-2 py-1 rounded">
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  )
}

export default Request
