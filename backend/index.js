const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

// Create a connection pool

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactjs",
});

// Middleware for parsing JSON requests
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  db.query("select * from users order by id DESC", (error, result) => {
    res.json(result);
  });
});
app.post("/add", function (req, res) {
  const { name, mobile, email, password } = req.body;
  db.query(
    "INSERT INTO users (name, mobile, email, password) VALUES (?,?,?,?)",
    [name, mobile, email, password],
    (error, result) => {
      if (error) throw error;
      res.status(201).json({ message: "User added successfully" });
      console.log(`User added with ID: ${result.insertId}`);
    }
  );
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
