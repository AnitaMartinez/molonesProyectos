const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const server = express();

server.use(cors());

// configurar para poder usar motor de plantillas
server.set("view engine", "ejs");

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "adalab",
  });
  connection.connect();
  return connection;
}

const port = 5000;
server.listen(port, () => {
  console.log("Server is running on port " + port);
});

// Endpoints

server.get("/api/projects", async (req, res) => {
  const sql =
    "SELECT * FROM project, author WHERE project.fk_author = author.id";
  res.json();
});

// POST
server.post("/api/project", async () => {
  const connection = await getDBConnection();
  const authorQuerySQL =
    "INSERT INTO author (name, job, image) VALUES(?, ?, ?)";
  const [authorResult] = await connection.query(authorQuerySQL, [
    req.body.author,
    req.body.job,
    req.body.img,
  ]);
  const idNewAuthor = authorResult.inserId;

  const projectQuerySQL =
    "INSERT INTO project (repo, url, fk_author) VALUES(?, ?, ?)";
  const [projectResult] = await connection.query(projectQuerySQL, [
    req.body.repository,
    req.body.url,
    idNewAuthor,
  ]);
  res.json({
    success: true,
    cardURL: `http://localhost/detail/${projectResult.inserId}`, // esta es la url de la card
  });
});

server.get("detail/:idProject", async (req, res) => {
  // tengo que recoger el id que me llega de la url
  const { idProject } = req.params;
  // Necesito la información del proyecto y del autor
  const connection = getDBConnection();
  const sqlQuery =
    "SELECT * FROM project, author WHERE project.fk_author = author.idAuthor AND project.id = ?";
  const [result] = (await connection).query(sqlQuery, [idProject]);

  // renderizar detalle
  res.render("detail", { project: result[0] });
});

const staticServer = "./src/public-react";
server.use(express.static(staticServer));
