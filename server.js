require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
var cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const productRoute = require("./routes/productRoute.js")
const errorMiddleware = require("./middleware/errorMiddleware.js")

app.use(cors())
app.use("/api/products", productRoute)
app.get("/", (req, res) => {
  throw new Error("fake error")
  // res.send("Hello MOther")
})
 
app.use(errorMiddleware)

mongoose.set("strictQuery", false)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connected to Mongo")

    app.listen(PORT, () => {
      console.log(`Node API is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
