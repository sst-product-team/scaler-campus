import { Request, Response, NextFunction } from "express";

class HelloController {

    constructor() {
    }

    public index(req: Request, res: Response) {
        res.json({ message: 'Hello World' });
    }

}