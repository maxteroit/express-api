module.exports = app => {
    const mahasiswa = require("../controllers/mahasiswa.controller")
    var router = require("express").Router()

    router.post("/", mahasiswa.create)
    router.get("/", mahasiswa.findAll)
    router.get("/:id", mahasiswa.findOne)
    router.put("/:id", mahasiswa.update)
    router.delete("/:id", mahasiswa.delete)
    router.delete("/", mahasiswa.deleteAll)

    app.use("/api/mahasiswa", router)
}