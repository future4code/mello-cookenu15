import {Request, Response} from "express"
import Authenticator from "../services/Authenticator"
import UserDB from "../data/UserDatabase"
import BaseDB from "../data/BaseDatabase"

export default async function unfollowUser(req: Request, res: Response) {
  try {
    const token = req.headers.authorization as string
    const id = Authenticator.getTokenData(token).id
    const followingId = req.body.following_id

    if(!followingId) {
      throw Error("preencha o id do usuário que deseja deixar de seguir")
    }
    
    new UserDB().unfollowUser(id, followingId)

    res.status(200).send({message: "usuário deixou de seguir com sucesso"})
  } catch (error) {
    res.status(400).send({message: error.sqlmessage || error.message})
  }
  BaseDB.destroyConnection()
}
