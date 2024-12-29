// src/app/Utils.ts
import * as CryptoJS from 'crypto-js';

const SECRET_KEY = 'secret-key-12345';  // Replace with your actual key

export function encryptAnswer(answer: string): string {
  return CryptoJS.AES.encrypt(answer, SECRET_KEY).toString();
}

export function decryptAnswer(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

