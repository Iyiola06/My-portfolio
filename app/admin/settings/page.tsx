'use client';

import React from 'react';
import { Save, User, Lock, Bell, Globe } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and site preferences.</p>
      </div>

      {/* Profile Settings */}
      <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-[#2A2A25] pb-6">
          <div className="p-3 rounded-full bg-[#1a1a15] text-[#d39e17]">
            <User size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Profile Information</h2>
            <p className="text-sm text-gray-400">Update your personal details and public profile.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input type="text" defaultValue="Iyiola Ogunjobi" className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" defaultValue="admin@iyiola.dev" className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Bio</label>
            <textarea rows={3} defaultValue="Senior Full Stack Developer specializing in scalable web systems." className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors resize-none" />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-[#141414] border border-[#2A2A25] rounded-lg p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4 border-b border-[#2A2A25] pb-6">
          <div className="p-3 rounded-full bg-[#1a1a15] text-[#d39e17]">
            <Lock size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Security</h2>
            <p className="text-sm text-gray-400">Manage your password and authentication methods.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
            </div>
            <button className="px-3 py-1.5 text-xs font-bold text-[#d39e17] border border-[#d39e17]/30 rounded hover:bg-[#d39e17]/10 transition-colors">Enable</button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-[#2A2A25] pt-4">
            <div>
              <p className="text-white font-medium">Change Password</p>
              <p className="text-xs text-gray-500">Last changed 3 months ago.</p>
            </div>
            <button className="px-3 py-1.5 text-xs font-bold text-gray-300 border border-[#2A2A25] rounded hover:bg-[#2A2A25] transition-colors">Update</button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] px-6 py-3 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)]">
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
