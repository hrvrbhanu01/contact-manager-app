const asyncHandler= require("express-async-handler")
const User= require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
//@description for register a user
//@route POST /api/users/register
//@access to the api:  public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All the fields are mandatory...")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists...")
    }

    //hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword)

    const user=await User.create({
        username,
        email,
        password: hashedPassword,
    })

    console.log(`User Created ${user}`)
    if(user){
        res.status(201).json({ _id: user.id, email: user.email })
    }else{
        res.status(400);
        throw new Error("User data is not valid!");
    }
    res.json({ message: "Register the user" });
})

//@description for login a user
//@route POST /api/users/login
//@access to the api:  public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All the fields are mandatory...")
    }
    const user = await User.findOne({email});  //this will help us find if user is already present in the database or not !
    //compare password with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken= jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,    //token and token expiration time
        { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid!")
    }
})




//@description for current user info
//@route POST /api/users/current
//@access to the api:  private :- Because only a loggedIn user can get the current info

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
})

module.exports = {registerUser, loginUser, currentUser}


