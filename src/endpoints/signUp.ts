import { Request, Response } from 'express';
import IdGenerator from '../services/IdGenerator';
import Authenticator from '../services/Authenticator';
import UserDB from '../data/UserDatabase';
import { error } from 'console';

export default async function signUp(req: Request , res: Response){
    try {
        const {email, name, password } = req.body
        const id = IdGenerator.execute();

        if(!email || !name || !password){
            res.status(400).send({
                message: "Os campos email, nome e senha são obrigatórios"})
        } else if(password < 6){
            res.status(400).send({
                message: "A senha precisa ter no mínimo 6 caracteres"
            })
        } else {

            await new UserDB().createUser(id, email, name, password);
            const token = Authenticator.generateToken({id})
            res.status(200).send({message: 'Usuário criado com sucesso', token})
        }

    } catch (error) {
        res.status(400).send({message: error.sqlMessage || error.message});
    }
}