const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "karim",
  password: "mysqlpass",
  database: "WORKSHOP",
});
console.log("hello");

app.get("/favorites", (req, res) => {
  connection
    .promise()
    .query("SELECT * FROM favorites")
    .then(([data]) => {
      console.log(data[0]);
      res.send(data);
    });
});

app.post("/favorites", (req, res) => {
  connection
    .promise()
    .query("INSERT INTO favorites (productid) VALUES (?)", [
      req.body.productId,
    ]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
