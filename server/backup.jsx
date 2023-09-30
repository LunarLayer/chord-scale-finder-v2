import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import errorhandler from "errorhandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorhandler({ dumpExceptions: true, showStack: true }));
const PORT = process.env.PORT || 8800;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var mysql_pool = mysql.createPool({
  connectionLimit: 100,
  host: "mysql45.unoeuro.com",
  user: "lunarlayer_com",
  password: "nEyxG26mHkBect9fw5Dz",
  database: "lunarlayer_com_db",
});

app.get("/", (req, res) => {
  mysql_pool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      throw err;
    }
    connection.query("SELECT * FROM strings", (err2, data) => {
      if (err2) return res.json(err2);
      res.json(data);
    });
    connection.release();
  });
});

app.get("/strings", (req, res) => {
  mysql_pool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      throw err;
    }
    connection.query("SELECT * FROM strings", (err2, data) => {
      if (err2) return res.json(err2);
      res.json(data);
    });
    connection.release();
  });
});
app.post("/strings", (req, res) => {
  mysql_pool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      throw err;
    }
    connection.query(
      'INSERT INTO `strings`(`number`, `note`) VALUES (7,"X")',
      (err2, data) => {
        if (err2) return res.json(err2);
        res.json(data);
      }
    );
    connection.release();
  });
});
app.delete("/strings", (req, res) => {
  mysql_pool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      throw err;
    }
    connection.query(
      "DELETE FROM `strings` WHERE `number`= 7;",
      (err2, data) => {
        if (err2) return res.json(err2);
        res.json(data);
      }
    );
    connection.release();
  });
});

app.get("/tonality", (req, res) => {
  mysql_pool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      throw err;
    }
    connection.query("SELECT * FROM tonality", (err2, data) => {
      if (err2) return res.json(err2);
      res.json(data);
    });
    connection.release();
  });
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
