import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart as RePie, Pie, Cell, Legend 
} from 'recharts';

// ข้อมูลจำลองพนักงานรายบุคคล
const rawEmployeeData = [
  // Production
  ...Array(75).fill({ dept: 'Production', status: 'Active', gender: 'Female', engagement: 4.2 }),
  ...Array(50).fill({ dept: 'Production', status: 'Active', gender: 'Male', engagement: 4.0 }),
  ...Array(50).fill({ dept: 'Production', status: 'Terminated', gender: 'Female', engagement: 3.5 }),
  ...Array(33).fill({ dept: 'Production', status: 'Terminated', gender: 'Male', engagement: 3.2 }),
  // IT/IS
  ...Array(15).fill({ dept: 'IT/IS', status: 'Active', gender: 'Female', engagement: 4.6 }),
  ...Array(25).fill({ dept: 'IT/IS', status: 'Active', gender: 'Male', engagement: 4.5 }),
  ...Array(5).fill({ dept: 'IT/IS', status: 'Terminated', gender: 'Female', engagement: 3.8 }),
  ...Array(5).fill({ dept: 'IT/IS', status: 'Terminated', gender: 'Male', engagement: 3.6 }),
  // Software Eng
  ...Array(3).fill({ dept: 'Software Eng', status: 'Active', gender: 'Female', engagement: 4.8 }),
  ...Array(6).fill({ dept: 'Software Eng', status: 'Active', gender: 'Male', engagement: 4.5 }),
  ...Array(1).fill({ dept: 'Software Eng', status: 'Terminated', gender: 'Female', engagement: 3.0 }),
  ...Array(2).fill({ dept: 'Software Eng', status: 'Terminated', gender: 'Male', engagement: 3.4 }),
  // Admin Offices
  ...Array(6).fill({ dept: 'Admin Offices', status: 'Active', gender: 'Female', engagement: 4.1 }),
  ...Array(2).fill({ dept: 'Admin Offices', status: 'Active', gender: 'Male', engagement: 3.9 }),
  ...Array(2).fill({ dept: 'Admin Offices', status: 'Terminated', gender: 'Female', engagement: 3.0 }),
  // Sales
  ...Array(12).fill({ dept: 'Sales', status: 'Active', gender: 'Female', engagement: 4.3 }),
  ...Array(8).fill({ dept: 'Sales', status: 'Active', gender: 'Male', engagement: 4.0 }),
  ...Array(5).fill({ dept: 'Sales', status: 'Terminated', gender: 'Female', engagement: 3.7 }),
  ...Array(6).fill({ dept: 'Sales', status: 'Terminated', gender: 'Male', engagement: 3.5 }),
  // Executive
  ...Array(1).fill({ dept: 'Executive', status: 'Active', gender: 'Female', engagement: 5.0 })
];

const departmentsList = ['All', 'Production', 'IT/IS', 'Software Eng', 'Admin Offices', 'Sales', 'Executive'];
const statusList = ['All', 'Active', 'Terminated'];
const genderList = ['All', 'Female', 'Male'];

export default function HRDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>Loading Dashboard...</div>;

  // กรองข้อมูลตามหัวข้อที่เลือกครบทั้ง 3 เงื่อนไข
  const filteredEmployees = rawEmployeeData.filter(emp => {
    const matchDept = selectedDept === 'All' || emp.dept === selectedDept;
    const matchStatus = selectedStatus === 'All' || emp.status === selectedStatus;
    const matchGender = selectedGender === 'All' || emp.gender === selectedGender;
    return matchDept && matchStatus && matchGender;
  });

  // คำนวณค่า KPI Cards จากข้อมูลที่กรองแล้ว
  const totalEmployees = filteredEmployees.length;
  const activeEmployees = filteredEmployees.filter(emp => emp.status === 'Active').length;
  const terminatedEmployees = filteredEmployees.filter(emp => emp.status === 'Terminated').length;
  const avgEngagement = totalEmployees > 0 
    ? (filteredEmployees.reduce((acc, curr) => acc + curr.engagement, 0) / totalEmployees).toFixed(1)
    : '0.0';

  // ข้อมูลกราฟแท่ง (Department Distribution)
  const departmentData = departmentsList.filter(d => d !== 'All').map(dept => {
    const deptEmps = filteredEmployees.filter(emp => emp.dept === dept);
    return {
      name: dept,
      active: deptEmps.filter(e => e.status === 'Active').length,
      terminated: deptEmps.filter(e => e.status === 'Terminated').length
    };
  });

  // ข้อมูลกราฟวงกลม (Gender Demographics)
  const femaleCount = filteredEmployees.filter(emp => emp.gender === 'Female').length;
  const maleCount = filteredEmployees.filter(emp => emp.gender === 'Male').length;
  const genderData = [
    { name: 'Female', value: femaleCount, color: '#ec4899' },
    { name: 'Male', value: maleCount, color: '#3b82f6' }
  ];

  // ฟังก์ชันรีเซ็ตตัวกรองทั้งหมด
  const handleResetFilters = () => {
    setSelectedDept('All');
    setSelectedStatus('All');
    setSelectedGender('All');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '24px', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 20px auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}>
          HR Analytics Interactive Dashboard
        </h1>
        <p style={{ color: '#64748b', margin: 0 }}>รายงานสรุปข้อมูลทรัพยากรบุคคลและประสิทธิภาพองค์กร</p>
      </div>

      {/* Multi-Filter Module Panel */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 24px auto', 
        backgroundColor: '#ffffff', 
        padding: '16px 24px', 
        borderRadius: '12px', 
        border: '1px solid #e2e8f0', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          {/* Filter 1: Department */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>
              แผนก (Department)
            </label>
            <select 
              value={selectedDept} 
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
            >
              {departmentsList.map(dept => (
                <option key={dept} value={dept}>{dept === 'All' ? 'ทุกแผนก (All)' : dept}</option>
              ))}
            </select>
          </div>

          {/* Filter 2: Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>
              สถานะ (Status)
            </label>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
            >
              {statusList.map(status => (
                <option key={status} value={status}>{status === 'All' ? 'ทั้งหมด (All Status)' : status}</option>
              ))}
            </select>
          </div>

          {/* Filter 3: Gender */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' }}>
              เพศ (Gender)
            </label>
            <select 
              value={selectedGender} 
              onChange={(e) => setSelectedGender(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
            >
              {genderList.map(gender => (
                <option key={gender} value={gender}>{gender === 'All' ? 'ทุกเพศ (All Genders)' : gender}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Button */}
        <button 
          onClick={handleResetFilters}
          style={{ 
            padding: '8px 16px', 
            borderRadius: '6px', 
            border: 'none', 
            backgroundColor: '#f1f5f9', 
            color: '#475569', 
            fontSize: '14px', 
            fontWeight: '600', 
            cursor: 'pointer',
            alignSelf: 'flex-end',
            marginBottom: '2px'
          }}
        >
          ล้างตัวกรองทั้งหมด
        </button>
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
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 8px 0' }}>พนักงานตามเงื่อนไข</p>
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
            จำแนกพนักงานตามแผนก
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
            สัดส่วนเพศพนักงาน
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
