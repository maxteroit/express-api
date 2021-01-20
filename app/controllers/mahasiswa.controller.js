const db = require("../models")
const Mahasiswa = db.mahasiswa
const Op = db.Sequelize.Op
const fs = require("fs")

exports.create = (req, res) => {
    if(!req.body.nama){
        res.status(400).send({
            message: "Nama Tidak Boleh Kosong!"
        })
        return
    } else if(!req.body.jurusan){
        res.status(400).send({
            message: "Jurusan TIdak Boleh Kosong!"
        })
        return
    } else if(!req.body.angkatan){
        res.status(400).send({
            message: "Angkatan TIdak Boleh Kosong!"
        })
        return
    } else if(!req.body.nim){
        res.status(400).send({
            message: "Nim TIdak Boleh Kosong!"
        })
        return
    } else {
        const mahasiswa = {
            nama: req.body.nama,
            jurusan: req.body.jurusan,
            angkatan: req.body.angkatan,
            nim: req.body.nim,
            foto: fs.readFileSync("./public/uploads/" + req.file.filename)
        }

        Mahasiswa.create(mahasiswa).then(data => {
            // fs.writeFileSync("./public/uploads/"+req.file.filename, data.data)
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error"
            })
        })
    }
}

exports.findAll = (req, res) => {
    const nama = req.query.nama
    var kondisi = nama ? {nama: {[Op.like]: `%${nama}%`}} : null

    Mahasiswa.findAll({where: kondisi})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Terjadi Kesalahan Saat Mengambil Data Mahasiswa"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Mahasiswa.findByPk(id,{include : ["matakuliah"]})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengambil data mahasiswa dengan id "+id
        })
    })

}

exports.update = (req, res) =>{
    const id = req.params.id

    Mahasiswa.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message:"Berhasil Update Mahasiswa"
            })
        } else {
            res.send({
                message: "Gagal Update Mahasiswa"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengupdate data mahasiswa dengan id "+id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    
    Mahasiswa.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Berhasil hapus data mahasiswa"
            })
        } else {
            res.send({
                message: "Gagal hapus data mahasiswa"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error saat hapus data mahasiswa dengan id "+id
        })
    })
}

exports.deleteAll = (req, res) => {
    Mahasiswa.destroy({
        where : {},
        truncate: false
    })
    .then(num => {
        res.send({
            message: `${num} Data mahasiswa berhasil dihapus`
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "error menghapus semua data mahasiswa"
        })
    })
}