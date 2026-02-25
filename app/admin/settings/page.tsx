'use client';

import React, { useState, useEffect } from 'react';
import { Save, User, Lock, Loader2, Check, AlertCircle } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export default function SettingsPage() {
  const supabase = createBrowserSupabaseClient();

  // Profile state
  const [fullName, setFullName] = useState('Iyiola Ogunjobi');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('Senior Full Stack Developer specializing in scalable web systems.');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Password state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 2FA state
  const [tfaMsg, setTfaMsg] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        setFullName(user.user_metadata?.full_name || 'Iyiola Ogunjobi');
        setBio(user.user_metadata?.bio || 'Senior Full Stack Developer specializing in scalable web systems.');
      }
    }
    loadUser();
  }, [supabase]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        email,
        data: { full_name: fullName, bio },
      });

      if (error) throw error;
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPasswordMsg(null);
    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setPasswordSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setPasswordMsg({ type: 'success', text: 'Password updated successfully!' });
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordMsg(null);
      }, 3000);
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.message || 'Failed to update password.' });
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleEnable2FA = () => {
    setTfaMsg('Two-Factor Authentication is not yet available for this instance. Check back later.');
    setTimeout(() => setTfaMsg(null), 4000);
  };

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

        {saveSuccess && (
          <div className="flex items-center gap-2 p-3 rounded bg-green-900/20 border border-green-900/30 text-green-400 text-sm">
            <Check size={16} /> Profile saved successfully!
          </div>
        )}
        {saveError && (
          <div className="flex items-center gap-2 p-3 rounded bg-red-900/20 border border-red-900/30 text-red-400 text-sm">
            <AlertCircle size={16} /> {saveError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Bio</label>
            <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors resize-none" />
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
          {/* 2FA */}
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-white font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
            </div>
            <button onClick={handleEnable2FA} className="px-3 py-1.5 text-xs font-bold text-[#d39e17] border border-[#d39e17]/30 rounded hover:bg-[#d39e17]/10 transition-colors">Enable</button>
          </div>
          {tfaMsg && (
            <div className="p-3 rounded bg-[#d39e17]/10 border border-[#d39e17]/20 text-[#d39e17] text-sm">
              {tfaMsg}
            </div>
          )}

          {/* Change Password */}
          <div className="border-t border-[#2A2A25] pt-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">Change Password</p>
                <p className="text-xs text-gray-500">Update your account password.</p>
              </div>
              <button
                onClick={() => { setShowPasswordForm(!showPasswordForm); setPasswordMsg(null); }}
                className="px-3 py-1.5 text-xs font-bold text-gray-300 border border-[#2A2A25] rounded hover:bg-[#2A2A25] transition-colors"
              >
                {showPasswordForm ? 'Cancel' : 'Update'}
              </button>
            </div>

            {showPasswordForm && (
              <div className="mt-4 space-y-4 p-4 bg-[#0A0A0A] rounded-lg border border-[#2A2A25]">
                {passwordMsg && (
                  <div className={`p-3 rounded text-sm ${passwordMsg.type === 'success' ? 'bg-green-900/20 border border-green-900/30 text-green-400' : 'bg-red-900/20 border border-red-900/30 text-red-400'}`}>
                    {passwordMsg.text}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">New Password</label>
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 6 characters" className="w-full bg-[#141414] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Confirm New Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className="w-full bg-[#141414] border border-[#2A2A25] rounded-md p-3 text-white focus:outline-none focus:border-[#d39e17] transition-colors" />
                </div>
                <button
                  onClick={handleChangePassword}
                  disabled={passwordSaving}
                  className="flex items-center gap-2 bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] px-4 py-2 rounded-md font-bold text-sm transition-all disabled:opacity-50"
                >
                  {passwordSaving ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                  {passwordSaving ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="flex items-center gap-2 bg-[#d39e17] hover:bg-[#e5b02b] text-[#0A0A0A] px-6 py-3 rounded-md font-bold text-sm transition-all shadow-[0_0_15px_-3px_rgba(211,158,23,0.3)] hover:shadow-[0_0_20px_-3px_rgba(211,158,23,0.5)] disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : (saveSuccess ? <Check size={18} /> : <Save size={18} />)}
          {saving ? 'Saving...' : (saveSuccess ? 'Saved!' : 'Save Changes')}
        </button>
      </div>
    </div>
  );
}
