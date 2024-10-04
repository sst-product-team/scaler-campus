import { Request, Response } from "express";
import PasswordGenerator from "../utils/passwordGenerator";
import EmailService from "../email/EmailService";
import EmailServiceNodeMailer from "../email/EmailServiceNodeMailer";
import csv from "csv-parse";
import fs from "fs";
import NewUserEmailDTO from "../models/NewUserEmailDTO";
import { prisma, PrismaClient } from "../utils/prismaClient";

type MailUserProps =
  | NewUserEmailDTO
  | "Incomplete user details"
  | "User already exists";

class UserController {
  public prismaClient: PrismaClient;
  public passwordGenerator: PasswordGenerator;
  public emailService: EmailService;
  constructor() {
    this.prismaClient = prisma; // instance of PrismaClient
    this.passwordGenerator = new PasswordGenerator(); // generate and hash password
    this.emailService = new EmailServiceNodeMailer(); // send email to the user

    // bind all the functions to the class
    this.getUsers = this.getUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.createUser = this.createUser.bind(this);
    this.createBulkUser = this.createBulkUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  private async emailUser(email: string, phone: string, pass: string) {
    // create the email user object
    const emailUser = {
      email: email,
      phone: phone,
      password: pass,
    };

    await this.emailService.sendNewUserEmail(emailUser);
  }

  private async createUserImpl(email: string, name: string, phone: string) {
    // validate the user details
    if (!name || !email || !phone) {
      return "Incomplete user details";
    }

    // TODO: validate the email and phone number

    // check if user already exists
    const userExisting = await this.prismaClient.user.findUnique({
      where: {
        Email: email,
      },
    });

    if (userExisting) {
      return "User already exists";
    }

    // generate a secure password
    const pass = await this.passwordGenerator.generateSecurePassword(15);
    console.log("====================================");
    console.log(pass);
    console.log("====================================");

    // hash the password
    const hashedPassword = this.passwordGenerator.hashPassword(pass);

    // create the user
    const user = await this.prismaClient.user.create({
      data: {
        Name: name,
        Email: email,
        PhoneNumber: phone,
        Password: hashedPassword,
      },
    });

    // assign role to user
    await this.prismaClient.userRoles.create({
      data: {
        UserId: user.UserId,
        Role: "STUDENT",
      },
    });

    const mailUser = {
      email: email,
      phone: phone,
      password: pass,
    };

    return mailUser;
  }

  async getUsers(req: Request, res: Response) {
    // get all the users
    const users = await this.prismaClient.user.findMany();

    // send response
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    // get the user id from the request
    const { userId } = req.params;

    // find the user by id
    const user = await this.prismaClient.user.findUnique({
      where: {
        UserId: parseInt(userId),
      },
    });

    //send response
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    // get the user details from the request
    const { name, email, phone } = req.body;

    // create the user
    const user: MailUserProps = await this.createUserImpl(email, name, phone);

    if (user == "Incomplete user details") {
      res.status(400).json({
        message: "Incomplete user details",
      });
      return;
    }

    if (user == "User already exists") {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    // send email to the user
    // await this.emailUser(email, phone, user.password);

    // send response
    res.status(201).json({
      message: "User Created",
    });
  }

  async createBulkUser(req: Request, res: Response) {
    // validate file is present
    if (!req.file) {
      res.status(400).json({
        message: "Please provide a CSV file",
      });
      return;
    }

    // get the file
    const file = req.file;

    const data = fs.readFileSync(file.path);

    csv.parse(data, async (err, records) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ success: false, message: "An error occurred" });
      }

      for (const record of records) {
        const [email, name, phone] = record;

        // create the user
        const user: MailUserProps = await this.createUserImpl(
          email,
          name,
          phone
        ).then((user) => {
          return user;
        });

        if (user == "Incomplete user details") {
          res.status(400).json({
            message: "Incomplete user details",
          });
          return;
        } else if (user == "User already exists") {
          res.status(400).json({
            message: "User already exists",
          });
          return;
        } else {
          // send email to the user
          const mailed = await this.emailUser(email, phone, user.password).then(
            (mailed) => {
              return mailed;
            }
          );
        }
      }
    });

    // send response

    res.status(201).json({
      message: "Users Created",
    });
  }

  async updateUser(req: Request, res: Response) {
    // get user id
    const { userId } = req.params;

    // get user details
    let { name, email, phone, loginAllowed } = req.body;

    console.log("getting put for", userId, name, email, phone, loginAllowed);

    // validate user
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // check if user exists
    const user = await this.prismaClient.user.findUnique({
      where: {
        UserId: parseInt(userId),
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!name) {
      name = user.Name;
    }
    if (!email) {
      email = user.Email;
    }
    if (!phone) {
      phone = user.PhoneNumber;
    }
    if (loginAllowed === undefined) {
      loginAllowed = user.LoginAllowed;
    }

    console.log(typeof loginAllowed);

    // update user
    await this.prismaClient.user.update({
      where: {
        UserId: parseInt(userId),
      },
      data: {
        Name: name,
        Email: email,
        PhoneNumber: phone,
        LoginAllowed: loginAllowed,
      },
    });

    res.json({ message: "User updated" });
  }

  async deleteUser(req: Request, res: Response) {
    //get user id
    const { userId } = req.params;

    // validate user
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // disable user to login
    await this.prismaClient.user.update({
      where: {
        UserId: parseInt(userId),
      },
      data: {
        LoginAllowed: false,
      },
    });
  }
}

export default UserController;
