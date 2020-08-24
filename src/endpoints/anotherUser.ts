import { Request, Response } from 'express';
import UserDB from '../data/UserDatabase';

export default async function anotherUser(req: Request , res: Response) {
    try {
        const id = req.params.id
        const token = req.headers.authorization as string;
        const requestData = await new UserDB().anotherUser(id);
    
        if(!id){
            res.status(400).send({message: 'É necessário fornecer um ID para essa consulta'});
        } else if (!token){res.status(400).send({message: 'É necessário estar logado'})}
        else{res.status(200).send(requestData)}
    } catch (error) {
        res.status(400).send({message: error.sqlMessage || error.message });
    }
}