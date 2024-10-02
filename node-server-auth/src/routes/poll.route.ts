import { Router } from "express";
import PollController from "../controllers/poll.controller";

class PollRoute {
  public router: Router;
  public pollcontroller: PollController;
  constructor() {
    this.router = Router();
    this.pollcontroller = new PollController();
    this.routes();
  }

  routes() {
    this.router.get("", this.pollcontroller.getAllPolls);
    this.router.post("", this.pollcontroller.createPoll);
    this.router.post("/vote", this.pollcontroller.voteOnPoll);
    this.router.get("/:pollId", this.pollcontroller.getResults);
  }
}

export default PollRoute;
