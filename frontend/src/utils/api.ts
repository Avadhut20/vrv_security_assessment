import axios from 'axios';

const API_URL = "http://localhost:5000/api"; // Fixed typo in URL

// Define TypeScript interfaces for User and Role data
export interface RoleData {
  id: number;
  name: string;
  permissions: string[]; // Array of permission strings
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  password: string;
  status: string; // Default is "Active"
  roleId: number;
  role: RoleData; // Role is an object
  createdAt: string;
}

// Create a user
export const createUser = async (userData: Omit<UserData, 'id' | 'role' | 'createdAt'>): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Get all users
export const getAllUsers = async (): Promise<UserData[]> => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    const users = response.data;

    // Transform the response if needed (in this case, the API data matches `UserData`)
    return users.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      status: user.status,
      roleId: user.roleId,
      role: user.role, // Role is already an object
      createdAt: user.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Create a role
export const createRole = async (roleData: Omit<RoleData, 'id'>): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/roles`, roleData);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

// Get all roles
export const getRoles = async (): Promise<RoleData[]> => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw error;
  }
};
