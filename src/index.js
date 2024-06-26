import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Conexão - testando
// const express = require("express");
// // const pool = require("./db/config/database.js");

// const app = express();
// const port = 3000;

// app.get("/test-db", async (req, res) => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query("SELECT NOW()");
//     client.release();
//     res.status(200).json({ status: "success", data: result.rows });
//   } catch (err) {
//     console.error(err);
//     res
//       .status(500)
//       .json({ status: "error", message: "Erro ao conectar ao banco de dados" });
//   }
// });

// app.listen(port, () => {
//   console.log(`App rodando na porta ${port}`);
// });

// reportWebVitals();
