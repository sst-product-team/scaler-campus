import { Router } from "express";
import PollController from "../controllers/poll.controller";

class PollRoute {
  public router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post("", new PollController().createPoll);
  }
}

export default PollRoute;
