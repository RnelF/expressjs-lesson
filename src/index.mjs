import express, { request, response } from "express";

import routes from "./routes/index.mjs";

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on the Port ${PORT}`);
});

app.get("/", (request, response) => {
  response.cookie("Hello", "World", {
    maxAge:
      60000 * 60 * 2 /*60secs multiply by 60 = 1 hour multiply again by 2 */,
  });
  response.status(201).send({ msg: "Hello" });
});
