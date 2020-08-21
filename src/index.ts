import dotenv from "dotenv";
import express from "express";
import { AddressInfo } from "net";
import newRecipe from "./endpoints/newRecipe"
import signUp from "./endpoints/signUp";
import login from './endpoints/login';
import getRecipeById from "./endpoints/getRecipeById";
import followUser from "./endpoints/followUser";

dotenv.config();
const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor executando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao inicializar servidor.`)
    }
  })

// >>>--- EndPoints Bellow ---<<<

  app.post('/signup', signUp);
  app.post('/login', login);
  app.post('/recipe', newRecipe);
  app.get('/recipe/:id', getRecipeById);
  app.post('/user/follow', followUser);
