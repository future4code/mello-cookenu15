import dotenv from "dotenv";
import express from "express";

import { AddressInfo } from "net";
import signUp from "./endpoints/signUp";

dotenv.config();
const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor executando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao inicializar servidor.`);
    }
  });

  // endpoints abaixo:

  app.post('/signup', signUp);