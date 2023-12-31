const express = require("express");

const router = express.Router();

const { 
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactController")
const validateToken=require("../middleware/validateTokenHandler");

router.use(validateToken)

// router.route("/retrieveSecrets/:secretName").get(retrieveSecrets);
// router.post("/storeSecrets", storeSecrets)
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)

module.exports = router;

