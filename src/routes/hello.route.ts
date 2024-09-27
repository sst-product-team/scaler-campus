import HelloController from "../controllers/hello.controller";
import { Application, Router } from "express";

class HelloRoute {
  public router: Router;
  private helloController: HelloController;
  constructor() {
    this.router = Router();
    this.helloController = new HelloController();
  }

  public routes(): void {
    this.router.get("", this.helloController.index);
  }
}

export default HelloRoute;
