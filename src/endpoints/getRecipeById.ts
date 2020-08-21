import {Request, Response} from "express"
import RecipeDatabase from "../data/RecipeDatabase";
import moment from "moment"

export default async function getRecipeById(req: Request, res: Response): Promise<any> {
  try {
    const id = req.params.id
    const recipe = await new RecipeDatabase().getRecipeById(id)
    const recipeCopy = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      createdAt: moment(recipe.date).format("DD/MM/YYYY")
    }
    res.status(200).send(recipeCopy)
  } catch (error) {
    res.status(400).send({message: error.sqlmessage || error.message})
  }
}