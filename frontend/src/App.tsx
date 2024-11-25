import { useState } from "react";
import './App.css';
import RoleList from './components/RoleList';
import UserList from './components/UserList';
import './index.css';

function App() {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState<'user' | 'role'>('user');

  return (
    <div className="container mx-auto p-4">
      {/* Tabs */}
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 border-b-2 font-semibold ${activeTab === 'user' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
          onClick={() => setActiveTab('user')}
        >
          User
        </button>
        <button
          className={`px-4 py-2 border-b-2 font-semibold ${activeTab === 'role' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'}`}
          onClick={() => setActiveTab('role')}
        >
          Role
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'user' ? <UserList /> : <RoleList />}
    </div>
  );
}

export default App;
