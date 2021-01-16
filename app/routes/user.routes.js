
module.exports = app => {
    const verifikasiSignUp = require("../middleware/verifikasi")
    const user = require("../controllers/user.controller")
    // const checkDuplikatUsername = require("../middleware/verifikasi")
    var router = require("express").Router()

    router.post("/login", user.signIn)
    router.get("/", user.findAll)
    router.get("/:id", user.findOne)
    router.put("/:id", user.update)
    router.delete("/:id", user.delete)
    router.delete("/", user.deleteAll)
    
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
            )
        next()
    })
    router.post("/register",[verifikasiSignUp.checkDuplikatUsername],user.signUp)

    app.use("/api/auth", router)
}