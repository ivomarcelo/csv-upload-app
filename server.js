const express = require("express");
const multer = require("multer");
const csvtojson = require("csvtojson");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");

// Configuração do dotenv
dotenv.config();

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do multer para upload de arquivos
const upload = multer({ dest: "UploadAndDisplayCSV/" });

// Rota para upload do arquivo CSV
app.post("/UploadAndDisplayCSV", upload.single("file"), async (req, res) => {
  try {
    const csvFilePath = req.file.path;
    const jsonArray = await csvtojson().fromFile(csvFilePath);

    // Supondo que você tenha uma tabela chamada 'users'
    const tableName = "users";
    const client = await pool.connect();

    // Exemplo de criação de tabela, ajuste conforme necessário
    await client.query(`
            CREATE TABLE IF NOT EXISTS ${tableName} (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                age INT
            );
        `);

    for (let row of jsonArray) {
      await client.query(
        `INSERT INTO ${tableName} (name, age) VALUES ($1, $2)`,
        [row.name, row.age]
      );
    }

    client.release();
    fs.unlinkSync(csvFilePath); // Remove o arquivo CSV após o processamento
    res.status(200).send("Dados inseridos com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao inserir dados: " + error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
