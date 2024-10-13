import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { users } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserID } from "../utils/middleWare.mjs";

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (request, response) => {
    const result = validationResult(request);
    console.log(result);

    const {
      query: { filter, value },
    } = request;

    if (filter && value)
      return response.send(
        users.filter((user) => user[filter].includes(value))
      );

    return response.send(users);
  }
);

router.get("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;
  const findUser = users[findUserIndex];
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

router.post(
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

router.put("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { body, findUserIndex } = request;

  users[findUserIndex] = { id: users[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const {
    body,
    findUserIndex, //destructuring the id or only getting the Id
  } = request;

  users[findUserIndex] = { ...users[findUserIndex], ...body }; //overriding what we will only update

  return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;
  users.splice(findUserIndex, 1);

  return response.sendStatus(200);
});

export default router;
