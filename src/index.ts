import dotenv from "dotenv";
import express from "express";

import { AddressInfo } from "net";

import getRecipeById from "./endpoints/getRecipeById";
import unfollowUser from "./endpoints/unfollowUser";
import userProfile from './endpoints/userProfile';
import followUser from "./endpoints/followUser";
import newRecipe from "./endpoints/newRecipe";
import getFeed from "./endpoints/getFeed";
import signUp from "./endpoints/signUp";
import login from './endpoints/login';

dotenv.config();
const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor executando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao inicializar servidor.`)
  }})

// >>>--- EndPoints Bellow ---<<<

  app.post('/user/unfollow', unfollowUser);
  app.get('/recipe/:id', getRecipeById);
  app.get('/user/profile', userProfile);
  app.post('/user/follow', followUser);
  app.get('/user/feed', getFeed);
  app.post('/recipe', newRecipe);
  app.post('/signup', signUp);
  app.post('/login', login);