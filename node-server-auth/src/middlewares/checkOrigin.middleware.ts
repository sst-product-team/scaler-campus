import { Request, Response, NextFunction } from "express";

export default function checkOrigin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const origin = req.get("origin");

  console.log("====================================");
  console.log("origin", origin);
  console.log("====================================");

  if (origin === process.env.MY_ORIGIN) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Invalid origin" });
  }
}
