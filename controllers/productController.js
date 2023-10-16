const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const findProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params
    console.log(id, "hey")

    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body)
    const updatedProduct = await Product.findById(id)
    //product not found in database
    if (!product) {
      return res.status(404).json({ message: "cannot find any product with ID" })
    }
    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)
    const updatedProduct = await Product.find({})
    if (!product) {
      return res.status(404).json({ message: "cannot find any product with ID" })
    }

    res.status(200).json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getProducts, findProduct, createProduct, updateProduct, deleteProduct }
