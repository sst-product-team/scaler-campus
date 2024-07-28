import express, {Application} from 'express';
import { PrismaClient } from '@prisma/client';
import UserRoute from '../routes/user.route';
import AuthRoute from '../routes/auth.route';
import cors from 'cors';

class App {
    public app: Application;
    public prisma: PrismaClient;
    constructor() {
        this.app = express();
        this.prisma = new PrismaClient();
        this.config();
    }

    async config(): Promise<void> {
        await this.prisma.$connect();
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.get("/api/v0", (req, res) => {
            res.send("Hello World");
        });
        this.app.use("/api/v0/user", new UserRoute().router);
        this.app.use("/api/v0/auth", new AuthRoute().router);

    }

    start(PORT: number): void {
        this.app.listen(PORT, () => {
            console.log('Server on port', PORT);
        });
    }

}

export default App;