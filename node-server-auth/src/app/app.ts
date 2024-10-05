import express, { Application } from "express";
import { PrismaClient } from "@prisma/client";
import RoutesRegister from "../routes/routesRegister";
import cors from "cors";
import connectToDB from "../utils/DbConnect";

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
    connectToDB();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.urlencoded({ extended: false }));

    new RoutesRegister(this.app);
  }

  start(PORT: number): void {
    this.app.listen(PORT, () => {
      console.log("Server on port", PORT);
    });
  }
}

export default App;
