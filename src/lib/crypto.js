import CryptoJS from 'crypto-js';

const secretKey = 'your-secret-key'; // Ganti dengan kunci rahasia Anda

export const encryptId = (id) => {
  return CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
};

export const decryptId = (encryptedId) => {
  const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
