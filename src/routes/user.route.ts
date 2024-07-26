import { Router } from "express";
import UserController from "../controllers/user.controller";
import upload from "../utils/fileStorage";

class UserRoute {
    public router: Router;
    public usercontroller: UserController

    constructor() {
        this.router = Router();

        // create a new instance of UserController
        this.usercontroller = new UserController();

        this.routes();
    }

    routes() {
        // get all the users
        this.router.get("/", this.usercontroller.getUsers);

        // get user by id
        this.router.get("/:userId", this.usercontroller.getUserById);

        // create a new user
        this.router.post("/", this.usercontroller.createUser);

        // create multiple users
        this.router.post("/bulk", upload.single('file') , this.usercontroller.createBulkUser);

        // update user by id
        this.router.put("/:id", this.usercontroller.updateUser);

        // delete user by id
        this.router.delete("/:id", this.usercontroller.deleteUser);
    }
}

export default UserRoute;