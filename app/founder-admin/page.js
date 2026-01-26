"use client";
import { useState } from 'react';

export default function FounderAdmin() {
  const [pendingUsers, setPendingUsers] = useState([
    { id: 1, alias: "Citizen 04", email: "world@kindness.org", status: "PENDING", contribution: "Shared 10 Keys of Kindness" },
    { id: 2, alias: "IndieSoul", email: "soul@neurosphere.io", status: "PENDING", contribution: "Distributed rewards via E-KINDNESS" }
  ]);

  const approveUser = (id) => {
    setPendingUsers(pendingUsers.map(user => 
      user.id === id ? { ...user, status: "APPROVED" } : user
    ));
    alert("AI Guard: Identity ID Generated & Assets Allocated");
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#46FF2E', padding: '40px', fontFamily: 'monospace' }}>
      <h1 style={{ borderBottom: '4px double #46FF2E' }}>◈ FOUNDER COMMAND CENTER ◈</h1>
      <p style={{ color: '#FFD700' }}>Status: AI Guard Protocol v1.0 Active | Monitoring Global Apply</p>
      
      <div style={{ marginTop: '30px' }}>
        <h2>ANTREAN PENDAFTARAN WARGA</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #46FF2E' }}>
              <th>ALIAS</th>
              <th>KONTRIBUSI</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '15px 0' }}>{user.alias}</td>
                <td>{user.contribution}</td>
                <td style={{ color: user.status === 'APPROVED' ? '#46FF2E' : '#FFD700' }}>{user.status}</td>
                <td>
                  {user.status === 'PENDING' && (
                    <button 
                      onClick={() => approveUser(user.id)}
                      style={{ background: '#46FF2E', color: '#000', border: 'none', padding: '5px 10px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      APPROVE & ISSUE ID
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '50px', padding: '20px', border: '1px dashed #46FF2E' }}>
        <h3>RINGKASAN EKOSISTEM</h3>
        <ul>
          <li>Total TM Dialect: ENPE, LUV, STABLE (IND-EUR)</li>
          <li>Donation Pool: 15% (Ready for Emergency)</li>
          <li>Founder Lockup: 3 Years Remaining</li>
        </ul>
      </div>
    </div>
  );
}
