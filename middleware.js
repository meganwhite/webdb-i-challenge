const db = require('./data/dbConfig.js')

const validateAccountInfo = (req,res,next) => {
    const {body} = req;

    if(!body.name || !body.budget){
        res.status(400).json({message: "Please provide a name and budget"})
    }
    else if (typeof body.budget !== "number") {
        res.status(400).json({message: "Budget must be a number"})
    }
    else {
        next()
    }

}

const validateAccountID = async (req,res,next) => {
    const {id} = req.params;
    try {
        const account = await db("accounts")
            .where({id})
            .first()
        if(account) {
            req.account = account
            next()
        }
        else {
            res.status(404).json({message: "Please provide a valid account ID"})
        }
    }
    catch (error) {
        res.status(500).json({message: "Server error; could not retrieve account"})
    }
}

module.exports = {
    validateAccountInfo,
    validateAccountID
}