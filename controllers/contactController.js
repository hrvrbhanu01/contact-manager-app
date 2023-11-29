//for db connection

//@description for Get all contacts
//@route GET /api/contacts
//@access to the api:  public

const getContacts = (req, res) => {
    res.status(200).json({ message: "Get all contacts"})
}


//@description for Create new contact
//@route POST /api/contacts
//@access to the api:  public

const createContact = (req, res) => {
    console.log("The request body is: ", req.body);
    const {name, email, phone}=req.body;
    if(!name || !email || !phone){
        return res.status(400).json({message:"Please fill in all fields!"});
    }
    res.status(201).json({ message: "Create contact"})
}


//@description for Get contact
//@route GET /api/contacts
//@access to the api:  public

const getContact = (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}`})
}

//@description for Update contact
//@route PUT /api/contacts
//@access to the api:  public

const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}`})
}


//@description for Delete contact
//@route DELETE /api/contacts
//@access to the api:  public

const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}`})
}


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact }  //for exposing out