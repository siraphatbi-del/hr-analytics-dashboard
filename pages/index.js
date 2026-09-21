import React, { useState, useEffect } from 'react';
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
  ]
};

export default function HRDashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading Dashboard...</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '24px', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 24px auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>
          HR Analytics Interactive Dashboard
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>รายงานสรุปข้อมูลทรัพยากรบุคคลและประสิทธิภาพองค์กร</p>
      </div>

      {/* KPI Cards */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 24px auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '16px' 
      }}>
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>พนักงานทั้งหมด</p>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{mockHRData.kpis.totalEmployees} คน</h3>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>พนักงานปัจจุบัน (Active)</p>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>{mockHRData.kpis.activeEmployees} คน</h3>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>ลาออกแล้ว (Terminated)</p>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>{mockHRData.kpis.terminatedEmployees} คน</h3>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>ความผูกพันเฉลี่ย</p>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>{mockHRData.kpis.avgEngagement} / 5</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '24px' 
      }}>
        {/* Department Distribution */}
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
            จำนวนพนักงานแยกตามแผนก
          </h2>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockHRData.departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" name="Active" fill="#10b981" />
                <Bar dataKey="terminated" name="Terminated" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Demographics */}
        <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
            สัดส่วนเพศพนักงาน (Gender)
          </h2>
          <div style={{ width: '100%', height: '300px' }}>
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
