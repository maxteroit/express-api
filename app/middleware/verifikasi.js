const db = require("../models")
const User = db.user

checkDuplikatUsername = (req, res, next) => {
    User.findOne({
        where: {username:req.body.username}
    }).then(userdata => {
        if(!userdata){
            next()
        } else {
            res.status(400).send({
                message: "Username tidak dapat digunakan"
            })
        }
    })
}

const verifikasiSignUp = {
    checkDuplikatUsername : checkDuplikatUsername,
}
module.exports = verifikasiSignUp