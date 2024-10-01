import { Request, Response } from "express";

type PollQuestion = {
  question: string;
  options: string[];
};

class PollController {
  constructor() {}

  async createPoll(req: Request, res: Response) {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    delete req.body.question;
    const options: string[] = Object.values(req.body);

    const Poll: PollQuestion = {
      question,
      options,
    };


    

    return res.status(200).json({ message: "Poll created" });
  }
}

export default PollController;
