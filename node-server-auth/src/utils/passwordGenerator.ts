import { randomInt } from 'crypto';
import bcrypt from 'bcrypt';
import Env from '../env';

class PasswordGenerator {

    // charset for password generation
    private charset: string = Env.PASSWORD_CHARSET;

    // number of salt rounds for hashing
    private saltRounds: number = Env.ENCRYPT_SALT;

    // generate a secure password
    public async generateSecurePassword(length: number): Promise<string> {
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = await this.getRandomInt(this.charset.length);
            password += this.charset[randomIndex];
        }
        return password;
    }

    // hash the password
    public hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(this.saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    }

    // compare the password
    public comparePassword(password: string, hashedPassword: string): boolean {
        return bcrypt.compareSync(password, hashedPassword);
    }

    // generate a random integer
    private getRandomInt(max: number): Promise<number> {
        return new Promise((resolve, reject) => {
            randomInt(0, max, (err, n) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(n);
                }
            });
        });
    }
}

export default PasswordGenerator;
