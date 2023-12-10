//for db connection

// in order to use mongodb i.e. mongoose we will have to make a promise so that's why we will be--
// using async and await for the database connection

//in case of async , if you want to catch an error you need to use try and catch block in that case.


const asyncHandler = require("express-async-handler")
const Contact= require("../models/contactModel");
const { constants } = require("../constants");
//@description for Get all contacts
//@route GET /api/contacts
//@access to the api:  private : as we need jwt authentication to login

const getContacts = asyncHandler(async (req, res) => {
    const contacts=await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})


//@description for Create new contact
//@route POST /api/contacts
//@access to the api:  private

const createContact = asyncHandler( async (req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, phone}=req.body;
    if(!name || !email || !phone){              //empty name, email, phone
        res.status(400);
        throw new Error("All fields are mandatory !");
    };
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});


//@description for Get contact
//@route GET /api/contacts
//@access to the api:  private

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    res.status(200).json({ message: `Get contact for ${req.params.id}`})
})

//@description for Update contact
//@route PUT /api/contacts
//@access to the api:  private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have authorization to update this contact!");
    }

    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});


//@description for Delete contact
//@route DELETE /api/contacts
//@access to the api:  private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(404);
        throw new Error("User do not have permission to delete other user contacts")
    }
    await Contact.remove();
    res.status(200).json(contact);
});


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }  //for exposing out