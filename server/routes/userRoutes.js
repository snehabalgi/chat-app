// server/routes/userRoutes.js
const router = require("express").Router()
const { register } = require("../controllers/usersController.js")
const { login } = require("../controllers/usersController")
const { setAvatar } = require("../controllers/usersController")

router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)
module.exports = router
