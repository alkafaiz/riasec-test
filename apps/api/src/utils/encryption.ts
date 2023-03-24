import bcrypt from 'bcrypt';

export const hash = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

export const compareHash = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
