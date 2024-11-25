# vrv_security_assessment
# RBAC User Interface - Admin Dashboard

## Project Overview

This project is a Role-Based Access Control (RBAC) User Interface (UI) for managing users, roles, and permissions in an admin dashboard. The goal of this project is to provide administrators with a user-friendly and secure way to manage users, roles, and permissions dynamically.

### Key Features:
1. **User Management:**
   - View and manage users.
   - Options to add, edit, and delete users.
   - Ability to assign roles to users and manage their status (Active/Inactive).
   
2. **Role Management:**
   - Create and edit roles.
   - Allow roles to include permissions (e.g., Read, Write, Delete) or custom attributes.

3. **Dynamic Permissions:**
   - Assign or modify permissions for roles.
   - Display permissions clearly for easy understanding and modification.

4. **Custom API Simulation (Optional):**
   - Mock API calls for CRUD operations on users and roles.
   - Simulate server responses to validate functionality.

---

## Tech Stack

- **Frontend Framework:** React.js
- **State Management:** React Context API / Redux (Optional)
- **CSS Framework:** Tailwind CSS / Bootstrap (Optional)
- **Routing:** React Router
- **Backend Simulation:** Mock API using JSON Server or any backend simulation tool
- **Authentication:** (Optional) JWT-based authentication (or mock authentication for this project)

---

## Getting Started

Follow the steps below to set up and run this project locally.

### Prerequisites

- **Node.js** and **npm** installed on your machine. If you don’t have them installed, you can download them from [Node.js official website](https://nodejs.org/).

- **Git** installed on your machine. You can download Git from [Git official website](https://git-scm.com/).

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash git clone https://github.com/Avadhut20/vrv_security_assessment.git ```

### 2. Backend 
First do the npm install and then use npm run build to start the server

API Simulation
This project uses mock APIs to simulate backend data. The following endpoints are available for CRUD operations:

GET /api/users: Fetch all users
GET /api/roles: Fetch all roles
POST /api/users: Create a new user
PUT /api/users/:id: Update an existing user
DELETE /api/users/:id: Delete a user
POST /api/roles: Create a new role
PUT /api/roles/:id: Update an existing role
DELETE /api/roles/:id: Delete a role

### Frontend
Use npm install and use npm run dev to start the frontend