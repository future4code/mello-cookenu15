import { Request, Response } from 'express';
import Authenticator from '../services/Authenticator';
import UserDB from '../data/UserDatabase';


export default async function userProfile(req: Request , res: Response){
    try {
        const token = req.headers.authorization as string;
        const id = Authenticator.getTokenData(token).id as string;
        const requestData = await new UserDB().userProfile(id);

        if(!token){
            res.status(400).send({message: 'É necessário fornecer um token válido para esta consulta.' })
        } else {
            res.status(200).send({requestData});
        }
    } catch (error) {
        res.status(400).send({message: error.sqlMessage || error.message});
    }
}