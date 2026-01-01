#!/bin/bash
MESSAGE=$1
cat << 'EOT' > components/EmergencyAlert.js
export default function EmergencyAlert() {
  return (
    <div style={{ background: '#f00', color: '#fff', padding: '10px', fontWeight: 'bold' }}>
      PROKLAMASI: $MESSAGE
    </div>
  );
}
EOT
echo "Pengumuman diperbarui: $MESSAGE"
