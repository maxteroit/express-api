const jwt = require("jsonwebtoken")
const db = require("../models")
const User = db.user
const auth = require("../config/auth.config")

verifikasiToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]

    if(!token){
        return res.status(403).send({
            message: "TIdak Ada Token"
        })
    }

    jwt.verify(token, auth.secret, (err, decoded)=> {
        if(err){
            return res.status(401).send({
                message: "Unauthorized"
            })
        } else {
            // req.id = decoded.id
            next()
        }
    })
}

const authentification = {
    verifikasiToken:verifikasiToken
}

module.exports = authentification