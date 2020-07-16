import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { RecipeDatabase } from "../data/RecipeDataBase";

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const recipeDB = new RecipeDatabase();
    const recipeInfo = await recipeDB.getInfoById(req.params.id);

    res.status(200).send({
      recipeInfo,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};
