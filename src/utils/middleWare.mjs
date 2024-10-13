import { users } from "./constants.mjs";

export const resolveIndexByUserID = (request, response, next) => {
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
