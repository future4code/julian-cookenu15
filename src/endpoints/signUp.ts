import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import HashManager from "../services/HashManager";

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.body.password || req.body.password.length < 6) {
      throw new Error("Your passwords needs at least 6 characters!");
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    const hashManager = new HashManager();
    const cipherText = await hashManager.hash(userData.password);

    const idGenerator = new IdGenerator();
    const id: string = idGenerator.generate();

    const userGenerator = new UserDatabase();
    await userGenerator.createUser(id, userData.email, cipherText);

    const auth = new Authenticator();
    const token = auth.generateToken({
      id,
    });

    res.status(200).send({
      token,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};