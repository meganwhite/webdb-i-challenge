const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

const {
    validateAccountInfo,
    validateAccountID
} = require("../middleware.js")

router.get("/", async (req,res) => {
    // get all accounts
    try {
        const accounts = await db("accounts")
        res.status(200).json(accounts)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error; could not retrieve accounts"})
    }
    res.status(200).json(account)
})

router.get("/:id", validateAccountID, async (req,res) => {
    //get request by id
    const {account} = req;
    res.status(200).json(account); 
})

router.post("/", validateAccountInfo, async (req,res) => {
    //post request
    const {body} = req;
    const [id] = await db("accounts").insert(body,"id");
    res.status(200).json(id)
})

router.put("/:id", validateAccountInfo, async (req,res) => {
    //put request
    const {id} = req.params;
    const changes = req.body;
    try {
        const count = await db("accounts")
            .where({id})
            .update(changes)
        res.status(200).json({message:`Successfully updated ${count} record(s)`})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error; could not update resource"})
    }
})

router.delete("/:id", validateAccountID, async (req,res) => {
    //delete request
    const {id} = req.params;
    try {
        const deleted = await db("accounts")
            .where({id})
            .del()
        res.status(200).json({message: `Successfully deleted account`})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error; could not delete account"})
    }

})

module.exports = router;