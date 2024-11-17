const User = require("../model/userModel")
const bcrypt = require("bcrypt") //encypt password
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const usernameCheck = await User.findOne({ username })
    if (usernameCheck)
      return res.json({ msg: "Username already exists", status: false })
    const emailCheck = await User.findOne({ email })
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false })
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    delete user.password
    return res.json({ status: true, user })
  } catch (ex) {
    next(ex)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user)
      return res.json({ msg: "Incorrect ussername or password", status: false })
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect ussername or password", status: false })
    delete user.password
    return res.json({ status: true, user })
  } catch (ex) {
    next(ex)
  }
}

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id
    const avatarImage = req.body.image
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true } // Return the updated user data
    )

    // Check if the user data was found and updated
    if (!userData) {
      return res.status(404).json({ msg: "User not found" })
    }

    // Include 'isSet' in the response
    return res.status(200).json({
      isSet: true,
      image: userData.avatarImage,
    })
  } catch (ex) {
    console.error("Error in setAvatar:", ex.message)
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: ex.message })
  }
}
