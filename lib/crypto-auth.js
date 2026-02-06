import crypto from 'crypto';

export const hashSensitiveData = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Gunakan ini saat menyimpan session_token ke database
export const secureSessionStore = (rawToken) => {
  return hashSensitiveData(rawToken);
};
