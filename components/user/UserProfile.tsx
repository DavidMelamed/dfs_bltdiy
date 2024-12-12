import React, { useState } from 'react';
import { User, Settings, Bell, Key, CreditCard } from 'lucide-react';

interface UserSettings {
  email: string;
  name: string;
  company: string;
  website: string;
  notifications: {
    email: boolean;
    desktop: boolean;
    reports: boolean;
  };
  subscription: {
    plan: string;
    status: string;
    nextBilling: string;
  };
}

const defaultSettings: UserSettings = {
  email: 'user@example.com',
  name: 'John Doe',
  company: 'Example Corp',
  website: 'https://example.com',
  notifications: {
    email: true,
    desktop: true,
    reports: false
  },
  subscription: {
    plan: 'Professional',
    status: 'Active',
    nextBilling: '2024-05-01'
  }
};

export const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Profile Information</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            value={settings.company}
            onChange={(e) => setSettings({ ...settings, company: e.target.value })}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="url"
            value={settings.website}
            onChange={(e) => setSettings({ ...settings, website: e.target.value })}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-50"
          />
        </div>

        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </button>
        )}
      </div>
    </div>
  );

  const renderNotificationSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Notification Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500">Receive updates via email</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.email}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, email: e.target.checked }
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Desktop Notifications</p>
            <p className="text-sm text-gray-500">Show desktop alerts</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.desktop}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, desktop: e.target.checked }
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Weekly Reports</p>
            <p className="text-sm text-gray-500">Receive weekly performance reports</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications.reports}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, reports: e.target.checked }
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );

  const renderSubscriptionSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Subscription Details</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <p className="font-medium">{settings.subscription.plan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="font-medium">{settings.subscription.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Next Billing Date</p>
            <p className="font-medium">{settings.subscription.nextBilling}</p>
          </div>
        </div>
      </div>
      <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
        Upgrade Plan
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'subscription', label: 'Subscription', icon: CreditCard },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && renderProfileSection()}
          {activeTab === 'notifications' && renderNotificationSection()}
          {activeTab === 'subscription' && renderSubscriptionSection()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
