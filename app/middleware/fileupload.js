const multer  = require("multer")
const imageFilter = (req, file, cb) => {
    if(file.mimetype.startsWith("image")){
        cb(null, true)
    } else {
        cb("Hanya Boleh Upload File Jenis Gambar", false)
    }
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var uploadFile = multer({storage: storage, fileFilter: imageFilter})
module.exports = uploadFile