import React, { useState } from "react";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const notifications = [
    "New video uploaded",
    "Assignment due tomorrow",
    "Admin posted an announcement",
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Notifications
      </button>
      {open && (
        <div className="absolute mt-2 w-64 bg-white shadow-lg rounded-md p-4">
          {notifications.map((note, idx) => (
            <p key={idx} className="border-b last:border-0 py-2 text-gray-700">
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
