import { Router } from "express";
import AuthController from "../controllers/auth.controller";

class AuthRoute {
    public router: Router;
    public authcontroller: AuthController;
    constructor() {
        this.router = Router();

        // create a new instance of UserController
        this.authcontroller = new AuthController();

        this.routes();
    }

    routes() {
        this.router.post("/login", this.authcontroller.login);
        this.router.post("/validate", this.authcontroller.validateToken);
    }
}

export default AuthRoute;