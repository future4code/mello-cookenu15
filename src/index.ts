import knex from "knex";
import dotenv from "dotenv";
import express from "express";

import { AddressInfo } from "net";

dotenv.config();
const app = express();
app.use(express.json());

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor executando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao inicializar servidor.`);
    }
  });;