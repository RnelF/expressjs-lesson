import express, { request, response } from "express";

const app = express();
app.use(express.json());

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, username: "Arnel", displayName: "Rnel" },
  { id: 2, username: "Dave", displayName: "Dave" },
  { id: 3, username: "Raul", displayName: "Raul" },
  { id: 4, username: "Niko", displayName: "Niks" },
  { id: 5, username: "Jomar", displayName: "Jom" },
  { id: 6, username: "Carl", displayName: "CJ" },
  { id: 7, username: "Biggy", displayName: "Big" },
  { id: 8, username: "James", displayName: "Jim" },
];

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

app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request; //distructuring
  if (filter && value)
    return response.send(users.filter((user) => user[filter].includes(value)));

  return response.send(users);
});

app.post("/api/users", (request, response) => {
  console.log(request.body);
  const { body } = request; //distructuring
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return response.status(201).send(newUser);
});

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    return response.status(400).send("Bad Request. Invalid ID");
  }

  const findUser = users.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: " Nuggets", price: 12.99 }]);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return response.send(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);

  users[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", (request, response) => {
  const {
    body,
    params: { id }, //destructuring the id or only getting the Id
  } = request;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return response.send(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);

  users[findUserIndex] = { ...users[findUserIndex], ...body }; //overriding what we will only update

  return response.sendStatus(200);
});

app.delete("/api/users/:id", (request, response) => {
  const {
    params: { id },
  } = request;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  users.splice(findUserIndex, 1);

  return response.sendStatus(200);
});
