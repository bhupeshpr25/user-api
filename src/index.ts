// const express = require("express");
import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

let users = [
  {
    id: 1,
    name: "Isagi",
  },
  {
    id: 2,
    name: "Bachira",
  },
  {
    id: 3,
    name: "Nagi",
  },
  {
    id: 4,
    name: "Barou",
  },
  {
    id: 5,
    name: "Chigiri",
  },
  {
    id: 6,
    name: "Kunigami",
  },
  {
    id: 7,
    name: "Reo",
  },
];

//CREATE
app.post("/users", (req, res) => {
  const newUser = {
    name: req.body.name,
    id: Date.now(),
  };
  users.push(newUser);
  res.json(newUser);
});

//READ
app.get("/users", (req, res) => {
  // res.send("hello");
  res.json(users);
});

//UPDATE
app.put("/users", (req, res) => {
  const { id, name } = req.body;
  users = users.map((user) => {
    if (user.id === id) {
      user.name = name;
    }
    return user;
  });
  res.json(users);
});

//DELETE
app.delete("/users", (req, res) => {
  const { id } = req.body;
  users = users.filter((user) => user.id !== id);
  res.json(users);
});

//MIDDLEWARE - auth
const isAuthorized: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader === "secret") {
    next();
  } else {
    res.status(401);
    res.json({ message: "Invalid access" });
  }
};

//GET ONE USER
app.get("/users/:id", isAuthorized, (req, res) => {
  const id = +req.params.id;
  const user = users.filter((user) => user.id === id);
  res.json(user);
});

//start
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
