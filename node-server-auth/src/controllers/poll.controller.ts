import { Request, Response } from "express";
import PollModel, { OptionType } from "../models/Poll";

class PollController {
  constructor() {
    this.createPoll = this.createPoll.bind(this);
    this.voteOnPoll = this.voteOnPoll.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  private getOptionType(options: string[]) {
    const optionT: OptionType = {};

    for (let option in options) {
      optionT[options[option]] = [];
    }

    return optionT;
  }

  async createPoll(req: Request, res: Response) {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }
    delete req.body.question;
    const { acceptingResponses } = req.body;
    delete req.body.acceptingResponses;

    let options: string[] = Object.values(req.body);
    if (!options) {
      return res.status(400).json({ message: "Options are required" });
    }

    const OptionT: OptionType = this.getOptionType(options);

    console.log("====================================");
    console.log(OptionT);
    console.log("====================================");

    const newPoll = new PollModel({
      question: question,
      options: OptionT,
      acceptingResponses: acceptingResponses,
    });

    try {
      const result = await newPoll.save();

      return res
        .status(200)
        .json({ message: "Poll created", pollId: result._id });
    } catch (error) {
      console.error("Error creating poll:", error);
      return res.status(500).json({ message: "Error creating poll" });
    }
  }

  async voteOnPoll(req: Request, res: Response) {
    const { pollId, option } = req.body;

    if (!pollId || !option) {
      return res
        .status(400)
        .json({ message: "Poll ID and option are required" });
    }

    try {
      // Check if the option exists
      const poll = await PollModel.findById(pollId);
      if (!poll) {
        return res.status(404).json({ message: "Poll not found" });
      }

      const option = req.body.option;
      const user = req.body.user;

      if (!user || !option) {
        return res.status(400).json({ message: "Option and user required." });
      }

      // TODO: validate user

      console.log(poll.toObject().options[option]);

      if (poll.toObject().options[option] == undefined) {
        return res
          .status(400)
          .json({ message: `Option "${option}" does not exist in this poll` });
      }

      await PollModel.updateOne(
        { _id: pollId },
        {
          $set: {
            [`options.${option}`]: (poll.options[option] || []).push(user),
          },
        }
      );

      return res.status(200).json({ message: `Vote for "${option}" recorded` });
    } catch (error) {
      console.error("Error voting on poll:", error);
      return res.status(500).json({ message: "Error voting on poll" });
    }
  }

  async getResults(req: Request, res: Response) {
    const { pollId } = req.params;
    if (!pollId) {
      return res.status(400).json({ message: "Poll Id required" });
    }

    try {
      const poll = await PollModel.findById(pollId);

      if (!poll) {
        return res.status(404).json({ message: "Poll not found" });
      }

      return res.status(200).json(poll);
    } catch (error) {
      console.error("Error fetching poll:", error);
      return res.status(500).json({ message: "Error fetching poll" });
    }
  }
}

export default PollController;
