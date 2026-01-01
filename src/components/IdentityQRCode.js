import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const IdentityQRCode = ({ sovereignID, assets }) => {
  const qrData = JSON.stringify({
    id: sovereignID,
    type: "TM-LIV-ID",
    assets: assets,
    origin: "NeuroSphere"
  });

  return (
    <div className="qr-box" style={{ background: '#fff', padding: '15px', borderRadius: '10px' }}>
      <QRCodeSVG value={qrData} size={200} level={"H"} />
      <p style={{ color: '#000', fontSize: '12px', textAlign: 'center' }}>VALID IDENTITY</p>
    </div>
  );
};

export default IdentityQRCode;
