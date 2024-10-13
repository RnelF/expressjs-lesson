import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  response.send([{ id: 123, name: " Nuggets", price: 12.99 }]);
});

export default router;
