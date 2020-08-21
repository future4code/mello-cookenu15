import { Request, Response } from 'express';
import Authenticator from '../services/Authenticator';
import UserDB from '../data/UserDatabase';
import IdGenerator from '../services/IdGenerator';
import { HashManager } from '../services/HashManager';

export default async function login(req: Request, res: Response){
    try {
        const id = IdGenerator.execute();
        const {email, password} = req.body

        const userData = await new UserDB().loginUser(email)
        const userMail = userData.email
        const userPassword = userData.password
        const passwordCompared = await new HashManager().compare(password, userPassword)

        if(!userMail || passwordCompared !== true){
            res.status(400).send({message: "Email ou Senha Inválidos."})
        }else{
            const token = Authenticator.generateToken({id})
            res.status(200).send({message: 'Bem vindo, logado com sucesso',  token})
        }
    } catch (error) {
        res.status(400).send({message: error.sqlMessage || error.message});
    }
}