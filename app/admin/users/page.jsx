"use client";

import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/users", {
          method: "GET",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch users");
        }

        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="p-4">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user._id}
              className="border p-3 rounded flex justify-between"
            >
              <span>{user.email}</span>
              <span className="font-semibold">{user.role}</span>
              <span className="text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersPage;
