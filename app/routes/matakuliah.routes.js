module.exports = app => {
    const matakuliah = require("../controllers/matakuliah.controller")
    const authentification = require("../middleware/authjwt")
    var router = require("express").Router()
    const upload = require("../middleware/fileupload")

    router.post("/" ,matakuliah.create)
    router.get("/", matakuliah.findAll)
    router.get("/:id", matakuliah.findOne)
    router.get("/mahasiswa/:id", matakuliah.findOneByMahasiswa)
    router.get("/matakuliah/:nama", matakuliah.findOneByMatakuliah)
    router.put("/:id", matakuliah.update)
    router.delete("/:id", matakuliah.delete)
    router.delete("/", matakuliah.deleteAll)

    app.use("/api/matakuliah",[authentification.verifikasiToken], router)
}