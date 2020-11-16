import * as crypto from "crypto";

export const generateKey = (size = 32): string => {
  return crypto.randomBytes(size).toString("base64").slice(0, size);
};

export const encryptString = (payload: string, key: string): any => {
  try {
    const VECTOR_SIZE = 16;
    const iv = crypto.randomBytes(VECTOR_SIZE);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    let encrypted = cipher.update(payload, "utf8", "hex");
    encrypted += cipher.final("hex");
    const tag = cipher.getAuthTag();
    encrypted = iv.toString("hex") + tag.toString("hex") + encrypted;
    return encrypted;
  } catch (error) {
    return error;
  }
};

export const decryptString = (payload: string, key: string): any => {
  try {
    const VECTOR_SIZE = 16;
    const content = Buffer.from(payload, "hex");
    const iv = content.slice(0, VECTOR_SIZE);
    const authTag = content.slice(VECTOR_SIZE, VECTOR_SIZE * 2);
    const text = content.slice(VECTOR_SIZE * 2).toString("hex");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    return error;
  }
};
