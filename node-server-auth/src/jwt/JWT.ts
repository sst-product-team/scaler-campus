import jwt, { JwtPayload } from 'jsonwebtoken';
import Env from '../env';


class JWT {
    public secret : string;
    public expiry : string;

    constructor() {
        this.secret = Env.JWT_SECRET;
        this.expiry = Env.JWT_EXPIRY;
    }

    public sign(payload: JwtPayload) : string {
        return jwt.sign(payload, this.secret, { expiresIn: this.expiry });
    }

    public verify(token: string) : string | object {
        return jwt.verify(token, this.secret);
    }

    public decode(token: string) : string | JwtPayload | null {
        return jwt.decode(token);
    }

}

export default JWT;