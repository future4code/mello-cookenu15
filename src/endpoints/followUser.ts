import {Response, Request} from "express"
import Authenticator from "../services/Authenticator"
import UserDB from "../data/UserDatabase"
import BaseDB from "../data/BaseDatabase"

export default async function followUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string
    const userId = Authenticator.getTokenData(token).id
    const idToFollow = req.body.idToFollow

    if(!idToFollow) {
      throw Error('insira um id de usuário')
    }

    await new UserDB().followUser(userId, idToFollow)

    res.status(200).send({message: "seguindo usuário"})
  } catch (error) {
    res.status(200).send({message: error.sqlmessage || error.message})
  }
  BaseDB.destroyConnection()
}