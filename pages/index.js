import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePie, Pie, Cell, Legend 
} from 'recharts';

// ข้อมูลจำลองพนักงานแบบรายบุคคล เพื่อให้สามารถกรองตามแผนกได้จริง
const rawEmployeeData = [
  // Production
  ...Array(125).fill({ dept: 'Production', status: 'Active', gender: 'Female', engagement: 4.2 }),
  ...Array(83).fill({ dept: 'Production', status: 'Terminated', gender: 'Male', engagement: 3.5 }),
  // IT/IS
  ...Array(40).fill({ dept: 'IT/IS', status: 'Active', gender: 'Male', engagement: 4.5 }),
  ...Array(10).fill({ dept: 'IT/IS', status: 'Terminated', gender: 'Female', engagement: 3.8 }),
  // Software Eng
  ...Array(9).fill({ dept: 'Software Eng', status: 'Active', gender: 'Male', engagement: 4.6 }),
  ...Array(3).fill({ dept: 'Software Eng', status: 'Terminated', gender: 'Female', engagement: 3.2 }),
  // Admin Offices
  ...Array(8).fill({ dept: 'Admin Offices', status: 'Active', gender: 'Female', engagement: 4.0 }),
  ...Array(2).fill({ dept: 'Admin Offices', status: 'Terminated', gender: 'Female', engagement: 3.0 }),
  // Sales
  ...Array(20).fill({ dept: 'Sales', status: 'Active', gender: 'Female', engagement: 4.1 }),
  ...Array(11).fill({ dept: 'Sales', status: 'Terminated', gender: 'Male', engagement: 3.6 }),
  // Executive
  ...Array(1).fill({ dept: 'Executive', status: 'Active', gender: 'Female', engagement: 5.0 })
];

const departmentsList = ['All', 'Production', 'IT/IS', 'Software Eng', 'Admin Offices', 'Sales', 'Executive'];

export default function HRDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading Dashboard...</div>;

  // คำนวณข้อมูลตามแผนกที่กรอง
  const filteredEmployees = selectedDept === 'All' 
    ? rawEmployeeData 
    : rawEmployeeData.filter(emp => emp.dept === selectedDept);

  const totalEmployees = filteredEmployees.length;
  const activeEmployees = filteredEmployees.filter(emp => emp.status === 'Active').length;
  const terminatedEmployees = filteredEmployees.filter(emp => emp.status === 'Terminated').length;
  const avgEngagement = (filteredEmployees.reduce((acc, curr) => acc + curr.engagement, 0) / (totalEmployees || 1)).toFixed(1);

  // กราฟสัดส่วนเพศ (Gender) คำนวณตามแผนกที่เลือก
  const femaleCount = filteredEmployees.filter(emp => emp.gender === 'Female').length;
  const maleCount = filteredEmployees.filter(emp => emp.gender === 'Male').length;
  const genderData = [
    { name: 'Female', value: femaleCount, color: '#ec4899' },
    { name: 'Male', value: maleCount, color: '#3b82f6' }
  ];

  // กราฟแท่งแผนก (หากเลือกแผนกเฉพาะ จะไฮไลต์เฉพาะแผนกนั้น)
  const departmentData = departmentsList.filter(d => d !== 'All').map(dept => {
    const deptEmps = rawEmployeeData.filter(emp => emp.dept === dept);
    return {
      name: dept,
      active: deptEmps.filter(e => e.status === 'Active').length,
      terminated: deptEmps.filter(e => e.status === 'Terminated').length
    };
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '24px', fontFamily: 'sans-serif' }}>
      {/* Header & Filter Module */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 24px auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px' 
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>
            HR Analytics Interactive Dashboard
          </h1>
          <p style={{ color: '#64748b', margin: 0 }}>รายงานสรุปข้อมูลทรัพยากรบุคคลและประสิทธิภาพองค์กร</p>
        </div>

        {/* Filter Dropdown */}
        <div style={{ backgroundColor: '#ffffff', padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label htmlFor="dept-filter" style={{ fontWeight: '600', color: '#334155', fontSize: '14px' }}>
            กรองตามแผนก:
          </label>
          <select 
            id="dept-filter"
            value={selectedDept} 
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '6px', 
              border: '1px solid #cbd5e1', 
              backgroundColor: '#f8fafc', 
              fontSize: '14px',
              fontWeight: '500',
              color: '#0f172a',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {departmentsList.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'ทุกแผนก (All Departments)' : dept}
              </option>
            ))}
          </select>
        </div>
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
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{totalEmployees} คน</h3>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>พนักงานปัจจุบัน (Active)</p>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>{activeEmployees} คน</h3>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>ลาออกแล้ว (Terminated)</p>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>{terminatedEmployees} คน</h3>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>ความผูกพันเฉลี่ย</p>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#8b5cf6', margin: 0 }}>{avgEngagement} / 5</h3>
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
              <BarChart data={departmentData}>
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
            สัดส่วนเพศพนักงาน ({selectedDept === 'All' ? 'ภาพรวมองค์กร' : `แผนก ${selectedDept}`})
          </h2>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RePie>
                <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {genderData.map((entry, index) => (
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
