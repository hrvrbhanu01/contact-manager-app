//for db connection

// in order to use mongodb i.e. mongoose we will have to make a promise so that's why we will be--
// using async and await for the database connection

//in case of async , if you want to catch an error you need to use try and catch block in that case.


const asyncHandler = require("express-async-handler")
//@description for Get all contacts
//@route GET /api/contacts
//@access to the api:  public

const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get all contacts"})
})


//@description for Create new contact
//@route POST /api/contacts
//@access to the api:  public

const createContact = asyncHandler( async (req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    };
    res.status(201).json({ message: "Create contact"})
})


//@description for Get contact
//@route GET /api/contacts
//@access to the api:  public

const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}`})
})

//@description for Update contact
//@route PUT /api/contacts
//@access to the api:  public

const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}`})
})


//@description for Delete contact
//@route DELETE /api/contacts
//@access to the api:  public

const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}`})
})


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }  //for exposing out