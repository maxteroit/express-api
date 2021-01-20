module.exports = app => {
    const mahasiswa = require("../controllers/mahasiswa.controller")
    const authentification = require("../middleware/authjwt")
    var router = require("express").Router()
    const upload = require("../middleware/fileupload")

    router.post("/", [upload.single("foto"),mahasiswa.create])
    router.get("/", mahasiswa.findAll)
    router.get("/:id", mahasiswa.findOne)
    router.put("/:id", mahasiswa.update)
    router.delete("/:id", mahasiswa.delete)
    router.delete("/", mahasiswa.deleteAll)

    app.use("/api/mahasiswa",[authentification.verifikasiToken], router)
}