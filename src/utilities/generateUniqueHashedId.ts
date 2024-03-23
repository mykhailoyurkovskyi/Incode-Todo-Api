import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export async function generateUniqueHashedId(): Promise<string> {
  const randomId = Math.random().toString(36).substring(2);

  const hashedId = await bcrypt.hash(randomId, SALT_ROUNDS);

  return hashedId;
}
