import { Request, Response } from 'express';
import IdGenerator from '../services/IdGenerator';
import Authenticator from '../services/Authenticator';
import UserDB from '../data/UserDatabase';


export default async function userProfile(req: Request , res: Response){
    try {
        const id = IdGenerator.execute();
        const token = Authenticator.generateToken({id})


    } catch (error) {
        
    }
}