import {Request, Response} from "express"
import Authenticator from "../services/Authenticator"
import UserDB from "../data/UserDatabase"
import BaseDB from "../data/BaseDatabase"
import moment from "moment"

export default async function getFeed(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string
    Authenticator.getTokenData(token) 

    const feed = await new UserDB().getRecipesFeed()

    res.status(200).send({recipes: feed})
  } catch (error) {
    res.status(200).send({message: error.sqlmessage || error.message})
  }
  BaseDB.destroyConnection()
}