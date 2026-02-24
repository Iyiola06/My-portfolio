'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Eye, MousePointer, Globe } from 'lucide-react';

const data = [
  { name: 'Mon', visits: 4000, views: 2400 },
  { name: 'Tue', visits: 3000, views: 1398 },
  { name: 'Wed', visits: 2000, views: 9800 },
  { name: 'Thu', visits: 2780, views: 3908 },
  { name: 'Fri', visits: 1890, views: 4800 },
  { name: 'Sat', visits: 2390, views: 3800 },
  { name: 'Sun', visits: 3490, views: 4300 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
        <p className="text-gray-400 mt-1">Monitor your portfolio performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Visitors', value: '12,450', change: '+12%', icon: Users },
          { label: 'Page Views', value: '45,200', change: '+8%', icon: Eye },
          { label: 'Bounce Rate', value: '42.3%', change: '-2%', icon: MousePointer },
          { label: 'Avg. Session', value: '2m 14s', change: '+5%', icon: Globe },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#141414] border border-[#2A2A25] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded bg-[#1a1a15] text-[#d39e17]">
                <stat.icon size={20} />
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white font-mono">{stat.value}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141414] border border-[#2A2A25] p-6 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-6">Traffic Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A25" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#2A2A25', color: '#fff' }}
                  itemStyle={{ color: '#d39e17' }}
                />
                <Line type="monotone" dataKey="views" stroke="#d39e17" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="visits" stroke="#4a4a4a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#2A2A25] p-6 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-6">User Engagement</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A25" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1a1a15' }}
                  contentStyle={{ backgroundColor: '#0A0A0A', borderColor: '#2A2A25', color: '#fff' }}
                />
                <Bar dataKey="views" fill="#d39e17" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
