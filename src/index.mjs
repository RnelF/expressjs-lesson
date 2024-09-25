import express from "express";

const app = express();
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

app.get("/", (request, response) => {
  response.status(201).send({ hello: "Hello" });
});

app.get("/api/users", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;
  if (filter && value)
    return response.send(users.filter((user) => user[filter].includes(value)));

  return response.send(users);
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
