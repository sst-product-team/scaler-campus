import { Request, Response } from 'express';
import PasswordGenerator from '../utils/passwordGenerator';
import JWT from '../jwt/JWT';
import {prisma, PrismaClient} from '../utils/prismaClient';

type AuthUserProps = {
    email: string;
    password: string;
    requiredRole: string;
}

class AuthController {
    public prismaClient: PrismaClient;
    public passwordGenerator: PasswordGenerator;
    public jwt: JWT;
    constructor() {
        this.prismaClient = prisma;
        this.passwordGenerator = new PasswordGenerator();
        this.jwt = new JWT();
        this.login = this.login.bind(this);
        this.validateToken = this.validateToken.bind(this);
    }

    async login(req: Request, res: Response) {
        // get user details
        const { email, password, requiredRole } : AuthUserProps = req.body;

        // validate the user details
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid request" });
        }

        // validate the user role
        if (!requiredRole) {
            return res.status(400).json({ message: "Role is required" });
        }

        if(requiredRole != "STUDENT" && requiredRole != "ADMIN" && requiredRole != "TEACHER") {
            return res.status(400).json({ message: "Invalid role" });
        }
        
        // check if the user exists
        const user = await this.prismaClient.user.findUnique({
            where: {
                Email: email
            }
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // check if the password is correct
        const isPasswordCorrect = this.passwordGenerator.comparePassword(password, user.Password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // verify the user role
        const userRole = await this.prismaClient.userRoles.findUnique({
            where: {
                UserId_Role: {
                    UserId: user.UserId,
                    Role: requiredRole
                }
            }
        });

        if (!userRole) {
            return res.status(400).json({ message: "User not permitted to access resource" });
        }

        // check if user allowed to login
        if(!user.LoginAllowed) {
            return res.status(400).json({ message: "User disabled, deleted or not allowed to login" });
        }

        // update last login
        await this.prismaClient.user.update({
            where: {
                UserId: user.UserId
            },
            data: {
                LastLogin: new Date()
            }
        });

        // generate token
        const userTokenData = {
            UserId: user.UserId
        }

        const token = this.jwt.sign(userTokenData);

        // send response
        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    }

    async validateToken(req: Request, res: Response) {

        try {
            // get token from headers
            let token = req.headers.authorization;
            
    
            // validate token
            if (!token) {
                return res.sendStatus(401);
            }
            token = token.split(" ")[1];
    
            // decode token
            const decoded = this.jwt.verify(token);
            if (!decoded) {
                return res.status(403);
            }
    
            // send response
            return res.sendStatus(200)
        } catch (error) {
            return res.status(403).json({ message: "COULD NOT VALIDATE" });
        }

    }

}

export default AuthController;