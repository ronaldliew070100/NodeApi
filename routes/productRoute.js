const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const { getProducts, findProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productController")

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get("/blog", (req, res) => {
  res.send("Hello Blog Api")
})

router.get("/", getProducts)

router.get("/:id", findProduct)

router.post("/", createProduct)

//update a product
router.put("/:id", updateProduct)

//delete a product

router.delete("/:id", deleteProduct)

module.exports = router
