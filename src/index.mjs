import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on the Port ${PORT}`);
});

app.get("/", (request, response) => {
  response.status(201).send({ hello: "Hello" });
});

app.get("/api/users", (request, response) => {
  response.send([
    { id: 1, username: "Arnel", displayName: "Rnel" },
    { id: 2, username: "Dave", displayName: "Dave" },
    { id: 3, username: "Raul", displayName: "Raul" },
  ]);
});
