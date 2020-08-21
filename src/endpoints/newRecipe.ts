import express, {Request, Response} from 'express'
import RecipeDatabase from '../data/RecipeDatabase';
import BaseDB from '../data/BaseDatabase';

export default async function newRecipe(req: Request, res: Response) {
  try {
    const {title, description, user_id} = req.body
  
    await new RecipeDatabase().newRecipe(title, description, user_id)
    res.status(200).send({message: "receita criada com sucesso"})
  } catch (error) {
    res.status(400).send({message: error.sqlmessage || error.message})
  }
  BaseDB.destroyConnection()
}
