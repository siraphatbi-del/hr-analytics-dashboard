import React, { useState } from 'react';
import { 
  Users, UserCheck, UserX, Heart
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePie, Pie, Cell, Legend 
} from 'recharts';

const mockHRData = {
  kpis: {
    totalEmployees: 311,
    activeEmployees: 207,
    terminatedEmployees: 104,
    avgEngagement: 4.1
  },
  departmentData: [
    { name: 'Production', active: 125, terminated: 83 },
    { name: 'IT/IS', active: 40, terminated: 10 },
    { name: 'Software Eng', active: 9, terminated: 3 },
    { name: 'Admin Offices', active: 8, terminated: 2 },
    { name: 'Sales', active: 20, terminated: 11 },
    { name: 'Executive', active: 1, terminated: 0 }
  ],
  genderData: [
    { name: 'Female', value: 176, color: '#ec4899' },
    { name: 'Male', value: 135, color: '#3b82f6' }
  ],
  performanceData: [
    { name: 'Exceeds', count: 45 },
    { name: 'Fully Meets', count: 243 },
    { name: 'Needs Improvement', count: 18 },
    { name: 'PIP', count: 5 }
  ],
  recruitmentSources: [
    { source: 'Indeed', count: 87 },
    { source: 'LinkedIn', count: 76 },
    { source: 'Google Search', count: 49 },
    { source: 'Employee Referral', count: 31 },
    { source: 'Diversity Job Fair', count: 29 }
  ]
};

export default function HRDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-slate-800">HR Analytics Interactive Dashboard</h1>
        <p className="text-slate-500">รายงานสรุปข้อมูลทรัพยากรบุคคลและประสิทธิภาพองค์กร</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Users size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">พนักงานทั้งหมด</p>
            <h3 className="text-2xl font-bold text-slate-800">{mockHRData.kpis.totalEmployees} คน</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><UserCheck size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">พนักงานปัจจุบัน (Active)</p>
            <h3 className="text-2xl font-bold text-slate-800">{mockHRData.kpis.activeEmployees} คน</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-lg"><UserX size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">ลาออกแล้ว (Terminated)</p>
            <h3 className="text-2xl font-bold text-slate-800">{mockHRData.kpis.terminatedEmployees} คน</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><Heart size={24} /></div>
          <div>
            <p className="text-sm text-slate-500">ความผูกพันเฉลี่ย</p>
            <h3 className="text-2xl font-bold text-slate-800">{mockHRData.kpis.avgEngagement} / 5</h3>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">จำนวนพนักงานแยกตามแผนก</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockHRData.departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" name="Active" fill="#10b981" />
                <Bar dataKey="terminated" name="Terminated" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">สัดส่วนเพศพนักงาน (Gender)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RePie>
                <Pie data={mockHRData.genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {mockHRData.genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RePie>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
