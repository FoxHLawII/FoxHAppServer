import crypto from 'crypto';
import util from 'util';

export const generateBytes = (length: number): Promise<string> => {
  const randomBytes = util.promisify(crypto.randomBytes);
  return randomBytes(length).then(bytes => bytes.toString('hex'));
}