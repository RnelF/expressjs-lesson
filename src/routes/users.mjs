import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { users } from "../utils/constants.mjs";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";

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

export default router;
