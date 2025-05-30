import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const saltRounds = 10;

/* GENERATE HASHED PASSWORD WITH SHA1 */
export async function hashPassword(password: string): Promise<string> {
    const sha1Hash = crypto.createHash('sha1').update(password).digest('hex');
    const bcryptHash = await bcrypt.hash(sha1Hash, saltRounds);
    return bcryptHash;
};

/* COMPARE PASSWORD */
export async function comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const sha1Hash = crypto.createHash('sha1').update(plainPassword).digest('hex');
    const match = await bcrypt.compare(sha1Hash, hashedPassword);
    return match;
};