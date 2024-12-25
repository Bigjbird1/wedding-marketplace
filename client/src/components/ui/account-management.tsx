import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Bell } from 'lucide-react';
import { Shield } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Key } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Save } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    marketing: false,
    updates: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <button className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full border shadow-sm hover:bg-gray-50">
            <Mail className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="font-medium">Profile Photo</h2>
          <p className="text-sm text-gray-600">Update your profile picture</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">First Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Last Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Phone Number</label>
        <input
          type="tel"
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Keep your account secure by using a strong password and enabling two-factor authentication.
        </AlertDescription>
      </Alert>

      <div>
        <label className="block text-sm font-medium mb-1.5">Current Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-3 py-2 border rounded-lg pr-10"
            placeholder="Enter current password"
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">New Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className="w-full px-3 py-2 border rounded-lg pr-10"
            placeholder="Enter new password"
          />
          <button 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
        <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
          </div>
          <div className="w-12 h-6 bg-gray-200 rounded-full relative">
            <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
          </div>
        </button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { id: 'email', label: 'Email Notifications', description: 'Receive email updates about your account' },
            { id: 'browser', label: 'Browser Notifications', description: 'Get notified about important updates' },
            { id: 'marketing', label: 'Marketing Emails', description: 'Receive marketing and promotional emails' },
            { id: 'updates', label: 'Product Updates', description: 'Get notified about new features and updates' }
          ].map((setting) => (
            <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{setting.label}</p>
                <p className="text-sm text-gray-600">{setting.description}</p>
              </div>
              <button
                onClick={() => setNotifications(prev => ({
                  ...prev,
                  [setting.id]: !prev[setting.id]
                }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[setting.id] ? 'bg-gray-900' : 'bg-gray-200'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                  notifications[setting.id] ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <button className="w-full p-4 border-2 border-dashed rounded-lg hover:border-gray-400">
        <div className="flex flex-col items-center gap-2">
          <CreditCard className="w-6 h-6 text-gray-400" />
          <span className="text-gray-600">Add a new payment method</span>
        </div>
      </button>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-gray-600">Expires 12/24</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'payments':
        return renderPaymentSettings();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-semibold">Account Settings</h1>
        </div>

        <div className="grid grid-cols-4">
          {/* Sidebar */}
          <div className="border-r">
            <div className="p-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3 py-2 rounded-lg text-left flex items-center gap-3 mb-1 ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 mt-4 border-t">
              <button className="w-full px-3 py-2 text-red-600 rounded-lg text-left flex items-center gap-3 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="col-span-3 p-6">
            {renderContent()}

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t flex justify-between">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Cancel
              </button>
              <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
