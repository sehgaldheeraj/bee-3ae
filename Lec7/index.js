const products = [
  {
    id: 1,
    prodName: "Wireless Mouse",
    quantity: 150,
    price: 25.99,
    availability: "In Stock",
  },
  {
    id: 2,
    prodName: "Bluetooth Headphones",
    quantity: 80,
    price: 59.99,
    availability: "In Stock",
  },
  {
    id: 3,
    prodName: "Gaming Keyboard",
    quantity: 40,
    price: 99.99,
    availability: "Out of Stock",
  },
  {
    id: 4,
    prodName: "Smartphone Case",
    quantity: 200,
    price: 15.49,
    availability: "In Stock",
  },
  {
    id: 5,
    prodName: "Laptop Stand",
    quantity: 50,
    price: 34.99,
    availability: "In Stock",
  },
  {
    id: 6,
    prodName: "4K Monitor",
    quantity: 30,
    price: 299.99,
    availability: "In Stock",
  },
  {
    id: 7,
    prodName: "Wireless Charger",
    quantity: 120,
    price: 19.99,
    availability: "In Stock",
  },
  {
    id: 8,
    prodName: "USB-C Cable",
    quantity: 500,
    price: 9.99,
    availability: "In Stock",
  },
  {
    id: 9,
    prodName: "Portable Speaker",
    quantity: 90,
    price: 49.99,
    availability: "Out of Stock",
  },
  {
    id: 10,
    prodName: "Gaming Mouse Pad",
    quantity: 70,
    price: 12.99,
    availability: "In Stock",
  },
];

const express = require("express");
const app = express();
app.use(express.json());
//app.)

//GET all products
app.get("/products", (req, res) => {
  const { quantity } = req.query;
  console.log(quantity);
  if (quantity) {
    const queriedProducts = products.filter(
      (product) => product.quantity === quantity
    );
    return res.status(200).send({ products: queriedProducts });
  }
  res.status(200).send({ products: products });
});
//GET products where query
//GET products where params
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  res.send({ product: product });
});

app.listen(3000, () => {
  console.log("Server Started Successfully");
});
