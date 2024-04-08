import express from "express";
import { products } from "./constants.js";

const app = express();
const port = 3000;

app.get("/api/products", (req, res) => {
  if (req.query.search) {
    const filterProducts = products.filter((product) =>
      product.name.includes(req.query.search)
    );

    res.send(filterProducts);
    return;
  }

  setTimeout(() => {
    res.send(products);
  }, 3000);
});

app.listen(port, () => {
  console.log(`server running in ${port}`);
});
