import bcrypt from 'bcrypt';

export async function hash(payload) {
  const digest = await bcrypt.hash(payload, 10);
  return digest;
}

export function compare(plainPassword, storedPassword) {
  return bcrypt.compare(plainPassword, storedPassword);
}
