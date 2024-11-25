import React, { useEffect, useState } from "react";
import { getRoles, createRole, updateRole, deleteRole, RoleData } from "../utils/api";

const RoleList: React.FC = () => {
  const [roles, setRoles] = useState<RoleData[]>([]);
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] as string[] });
  const [editingRole, setEditingRole] = useState<RoleData | null>(null);

  const permissionOptions = ["Read", "Write", "Update", "Delete"];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handlePermissionChange = (permission: string, isEditing: boolean = false) => {
    if (isEditing && editingRole) {
      setEditingRole((prev) =>
        prev
          ? {
              ...prev,
              permissions: prev.permissions.includes(permission)
                ? prev.permissions.filter((perm) => perm !== permission)
                : [...prev.permissions, permission],
            }
          : null
      );
    } else {
      setNewRole((prev) => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter((perm) => perm !== permission)
          : [...prev.permissions, permission],
      }));
    }
  };

  const handleAddRole = async () => {
    try {
      const createdRole = await createRole(newRole);
      setRoles((prev) => [...prev, createdRole]);
      setNewRole({ name: "", permissions: [] });
      setShowAddRoleForm(false);
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };

  const handleEditRole = async () => {
    if (!editingRole) return;
    try {
      const updatedRole = await updateRole(editingRole.id, editingRole);
      setRoles((prev) =>
        prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
      );
      setEditingRole(null);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDeleteRole = async (id: number) => {
    try {
      await deleteRole(id);
      setRoles((prev) => prev.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Roles</h2>

      <button
        onClick={() => setShowAddRoleForm(!showAddRoleForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {showAddRoleForm ? "Cancel" : "Add Role"}
      </button>

      {showAddRoleForm && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="border p-2 mr-2"
          />
          {permissionOptions.map((permission) => (
            <label key={permission} className="inline-flex items-center mr-2">
              <input
                type="checkbox"
                checked={newRole.permissions.includes(permission)}
                onChange={() => handlePermissionChange(permission)}
              />
              <span className="ml-2">{permission}</span>
            </label>
          ))}
          <button
            onClick={handleAddRole}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Role
          </button>
        </div>
      )}

      {editingRole && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Role Name"
            value={editingRole.name}
            onChange={(e) =>
              setEditingRole((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
            className="border p-2 mr-2"
          />
          {permissionOptions.map((permission) => (
            <label key={permission} className="inline-flex items-center mr-2">
              <input
                type="checkbox"
                checked={editingRole.permissions.includes(permission)}
                onChange={() => handlePermissionChange(permission, true)}
              />
              <span className="ml-2">{permission}</span>
            </label>
          ))}
          <button
            onClick={handleEditRole}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditingRole(null)}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}

      <table className="table-auto  w-full border border-gray-300">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Permissions</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{role.name}</td>
              <td className="px-4 py-2">{role.permissions.join(", ")}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setEditingRole(role)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {roles.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No roles found.</p>
      )}
    </div>
  );
};

export default RoleList;
