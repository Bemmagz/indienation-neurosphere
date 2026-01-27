import crypto from 'crypto';

export const generateSovereignHash = (data) => {
  const secret = 'FOUNDER_GENESIS_KEY_2026';
  return crypto.createHmac('sha256', secret)
    .update(JSON.stringify(data))
    .digest('hex');
};
