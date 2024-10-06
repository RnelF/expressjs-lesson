import express, { request, response } from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";
import { queryValidationSchema } from "./utils/querySchemas.mjs";

const app = express();
app.use(express.json());

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

const resolveIndexByUserID = (request, response, next) => {
  const {
    params: { id }, //destructuring the id or only getting the Id
  } = request;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) return response.send(400);

  const findUserIndex = users.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
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

app.get(
  "/api/users",
  checkSchema(queryValidationSchema),
  (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { filter } = request.query;

    // Check if filter exists
    if (filter) {
      const validFilters = ["id", "username", "displayName"]; // Valid fields for filtering

      // Try to find a match in the users array
      const filteredUsers = users.filter((user) =>
        validFilters.some((key) => {
          const value = user[key];
          if (typeof value === "string") {
            // Use includes for string fields
            return value.toLowerCase().includes(filter.toLowerCase());
          } else if (typeof value === "number") {
            // Use equality check for number fields like id
            return value === parseInt(filter);
          }
          return false;
        })
      );

      if (filteredUsers.length === 0) {
        return response.status(404).send({ message: "No users found" });
      }

      return response.send(filteredUsers);
    }

    return response.send(users); // Return all users if no filter is provided
  }
);

app.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);
    console.log(request.body);

    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);

    const newUser = { id: users[users.length - 1].id + 1, ...data };
    users.push(newUser);
    return response.status(201).send(newUser);
  }
);

/////////////////////
app.get("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;
  const findUser = users[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

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
