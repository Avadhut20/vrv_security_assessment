import React, { useEffect, useState } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../utils/api";
import axios from "axios";
const API_URL = "http://localhost:5000/api";

interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  status: "active" | "deactive";
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [formData, setFormData] = useState<Partial<UserData>>({
    name: "",
    email: "",
    password: "",
    roleId: 1,
    status: "active",
  });
  const [editUserId, setEditUserId] = useState<number | null>(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = user.roleId.toString().includes(searchTerm); // Compare roleId as string
    return matchesName || matchesRole; // Match either name or roleId
  });

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "roleId" ? +value : value }));
  };

  // Handle form submission for add/edit user
  const handleSubmit = async () => {
    const validationError = validateFormData(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsLoading(true);
      if (formType === "add") {
        const response = await axios.post(`${API_URL}/users`, formData);
        setUsers((prev) => [...prev, response.data]);
      } else if (editUserId) {
        const response = await axios.put(
          `${API_URL}/users/${editUserId}`,
          formData
        );
        setUsers((prev) =>
          prev.map((user) => (user.id === editUserId ? response.data : user))
        );
      }

      setFormData({ name: "", email: "", password: "", roleId: 1, status: "active" });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError("Failed to save the user. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user delete
  const handleDelete = async (userId: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      setIsLoading(true);
      await axios.delete(`${API_URL}/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete the user. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show form with existing user data for editing
  const handleEditClick = (user: UserData) => {
    setFormType("edit");
    setEditUserId(user.id);
    setFormData(user);
    setShowForm(true);
  };

  const validateFormData = (data: Partial<UserData>) => {
    if (!data.name) return "Name is required.";
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email))
      return "A valid email is required.";
    if (formType === "add" && !data.password)
      return "Password is required for new users.";
    if (!data.roleId) return "Role ID is required.";
    if (!["active", "deactive"].includes(data.status || ""))
      return "Invalid status value.";
    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
        onClick={() => {
          setShowForm((prev) => !prev);
          setFormType("add");
          setEditUserId(null);
          setFormData({ name: "", email: "", password: "", roleId: 1, status: "active" });
        }}
      >
        {showForm ? "Cancel" : "Add User"}
      </button>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or role"
          className="border px-2 py-1 w-full mb-2"
        />
      </div>

      {showForm && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <h3 className="text-lg font-bold mb-2">
            {formType === "add" ? "Add User" : "Edit User"}
          </h3>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Name"
            className="border px-2 py-1 w-full mb-2"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            placeholder="Email"
            className="border px-2 py-1 w-full mb-2"
          />
          {formType === "add" && (
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              placeholder="Password"
              className="border px-2 py-1 w-full mb-2"
            />
          )}
          <input
            type="number"
            name="roleId"
            value={formData.roleId || 1}
            onChange={handleInputChange}
            placeholder="Role ID"
            className="border px-2 py-1 w-full mb-2"
          />
          <select
            name="status"
            value={formData.status || "active"}
            onChange={handleInputChange}
            className="border px-2 py-1 w-full mb-2"
          >
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
          </select>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      )}

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.roleId}</td>
                <td className="px-4 py-2 border">{user.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
