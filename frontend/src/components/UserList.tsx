import React, { useEffect, useState } from "react";
import { getAllUsers, createUser, UserData } from "../utils/api";

const UserComponent: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const validateInput = (): boolean => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!newUser.name) newErrors.name = "Name is required.";
    if (!newUser.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!newUser.password) {
      newErrors.password = "Password is required.";
    } else if (newUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validateInput()) return;

    try {
      const createdUser = await createUser(newUser);
      setUsers((prev) => [...prev, createdUser]);
      setNewUser({ name: "", email: "", password: "" });
      setShowAddUserForm(false);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>

      <button
        onClick={() => setShowAddUserForm(!showAddUserForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showAddUserForm ? "Cancel" : "Add User"}
      </button>

      {showAddUserForm && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-2">Add New User</h3>
          <div className="mb-2">
            <label className="block font-medium">Name</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border p-2 w-full"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-2">
            <label className="block font-medium">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border p-2 w-full"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-2">
            <label className="block font-medium">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="border p-2 w-full"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>
      )}

      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {/* Edit and Delete buttons can be added here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found.</p>
      )}
    </div>
  );
};

export default UserComponent;
