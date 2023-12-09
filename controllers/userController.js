const asyncHandler= require("express-async-handler")

//@description for register a user
//@route POST /api/users/register
//@access to the api:  public

const registerUser = asyncHandler(async (req, res) => {
    res.json({ message: "Register the user" })
})

//@description for login a user
//@route POST /api/users/login
//@access to the api:  public

const loginUser = asyncHandler(async (req, res) => {
    res.json({ message: "Login the user" })
})

//@description for current user info
//@route POST /api/users/current
//@access to the api:  private :- Because only a loggedIn user can get the current info

const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "Current user information" })
})

module.exports = {registerUser, loginUser, currentUser}