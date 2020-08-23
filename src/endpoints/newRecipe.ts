import express, {Request, Response} from 'express'
import RecipeDatabase from '../data/RecipeDatabase';
import BaseDB from '../data/BaseDatabase';
import Authenticator from '../services/Authenticator';
import moment from 'moment';
import IdGenerator from '../services/IdGenerator';

export default async function newRecipe(req: Request, res: Response) {
  try {
    const {title, description} = req.body
    const id = IdGenerator.execute()
    const date = moment().format("YYYY/MM/DD")

    const token = req.headers.authorization as string
    const user_id = Authenticator.getTokenData(token).id
    console.log(user_id)
  
    await new RecipeDatabase().newRecipe(id, title, description, date, user_id)
    res.status(200).send({message: "receita criada com sucesso"})
  } catch (error) {
    res.status(400).send({message: error.sqlmessage || error.message})
  }
  BaseDB.destroyConnection()
}
