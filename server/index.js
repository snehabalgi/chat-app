require("dotenv").config()
// console.log("PORT:", process.env.PORT)
// console.log("MONGO_URL:", process.env.MONGO_URL)

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull")
  })
  .catch((err) => {
    console.log(err.message)
  })

const server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`)
})
