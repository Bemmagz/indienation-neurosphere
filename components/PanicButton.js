import React, { useState } from 'react';

const PanicButton = () => {
  const [active, setActive] = useState(false);

  const handlePanic = () => {
    const confirmAction = confirm("PERINGATAN: Aktifkan Distribusi Darurat dari Donation Pool (15%)?");
    if (confirmAction) {
      setActive(true);
      alert("EMERGENCY PROTOCOL ACTIVATED. Donation Pool is now DISBURSING.");
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #ff0000', marginTop: '20px', textAlign: 'center' }}>
      <h3 style={{ color: '#ff0000' }}>EMERGENCY DONATION CONTROL</h3>
      <button 
        onClick={handlePanic}
        style={{ 
          backgroundColor: active ? '#550000' : '#ff0000', 
          color: '#fff', 
          padding: '20px 40px', 
          border: 'none', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          boxShadow: active ? 'none' : '0 0 20px #ff0000'
        }}
      >
        {active ? "DISTRIBUTION IN PROGRESS..." : "ACTIVATE PANIC BUTTON"}
      </button>
      <p style={{ fontSize: '0.7rem', marginTop: '10px' }}>*Hanya untuk aksi cepat bencana & perbuatan baik.</p>
    </div>
  );
};

export default PanicButton;
