import { Application } from "express";
import UserRoute from "./user.route";
import AuthRoute from "./auth.route";
import BatchRoute from "./batch.route";
import CourseRoute from "./course.route";
import LecureRoute from "./lecture.route";
import HelloRoute from "./hello.route";
import PollRoute from "./poll.route";

class RoutesRegister {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.registerV0();
    this.registerV1();
  }

  private registerV0() {
    this.app.get("/api/v0", new HelloRoute().router);
    this.app.use("/api/v0/user", new UserRoute().router);
    this.app.use("/api/v0/batch", new BatchRoute().router);
    this.app.use("/api/v0/auth", new AuthRoute().router);
    this.app.use("/api/v0/course", new CourseRoute().router);
    this.app.use("/api/v0/lecture", new LecureRoute().router);
  }

  private registerV1() {
    this.app.use("/api/v1/poll", new PollRoute().router);
  }
}

export default RoutesRegister;
