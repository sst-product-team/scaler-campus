import { Router } from "express";
import PollController from "../controllers/poll.controller";
import checkOrigin from "../middlewares/checkOrigin.middleware";

class PollRoute {
  public router: Router;
  public pollcontroller: PollController;
  constructor() {
    this.router = Router();
    this.pollcontroller = new PollController();
    this.routes();
  }

  routes() {
    this.router.get("", checkOrigin, this.pollcontroller.getAllPolls);
    this.router.post("", checkOrigin, this.pollcontroller.createPoll);
    this.router.post(
      "/vote/:pollId",
      checkOrigin,
      this.pollcontroller.voteOnPoll
    );
    this.router.get("/:pollId", checkOrigin, this.pollcontroller.getResults);
  }
}

export default PollRoute;
