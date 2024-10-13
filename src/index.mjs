import express, { request, response } from "express";

import usersRouter from "./routes/users.mjs";
import { users } from "./utils/constants.mjs";
import { resolveIndexByUserID } from "./utils/middleWare.mjs";

const app = express();
app.use(express.json());
app.use(usersRouter);

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on the Port ${PORT}`);
});

app.get(
  "/",
  (request, response, next) => {
    console.log("Base URL");
    next();
  },
  (request, response) => {
    response.status(201).send({ hello: "Hello" });
  }
);

/////////////////////

/////////////////////

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: " Nuggets", price: 12.99 }]);
});

app.put("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { body, findUserIndex } = request;

  users[findUserIndex] = { id: users[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const {
    body,
    findUserIndex, //destructuring the id or only getting the Id
  } = request;

  users[findUserIndex] = { ...users[findUserIndex], ...body }; //overriding what we will only update

  return response.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;
  users.splice(findUserIndex, 1);

  return response.sendStatus(200);
});
