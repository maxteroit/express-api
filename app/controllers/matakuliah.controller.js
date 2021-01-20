const db = require("../models")
const Matakuliah = db.matakuliah
const Mahasiswa = db.mahasiswa
const Op = db.Sequelize.Op
const fs = require("fs")
const { matakuliah } = require("../models")

exports.create = (req, res) => {
    if(!req.body.nama){
        res.status(400).send({
            message: "Nama Tidak Boleh Kosong!"
        })
        return
    } else if(!req.body.kode){
        res.status(400).send({
            message: "Kode TIdak Boleh Kosong!"
        })
        return
    } else if(!req.body.mahasiswaId){
        res.status(400).send({
            message: "mahasiswaId Tidak Boleh Kosong!"
        })
        return
    } else {
        const matakuliah = {
            nama: req.body.nama,
            kode: req.body.kode,
            mahasiswaId: req.body.mahasiswaId,
        }

        Matakuliah.create(matakuliah).then(data => {
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

    Matakuliah.findAll({where: kondisi})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Terjadi Kesalahan Saat Mengambil Data Matakuliah"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Matakuliah.findByPk(id, {include: ["mahasiswa"]})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengambil data matakuliah dengan id "+id
        })
    })

}

exports.findOneByMahasiswa = (req, res) => {
    const id = req.params.id
    Matakuliah.findAll({
        where: {mahasiswaId: id}, include: ["mahasiswa"]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengambil data matakuliah dengan id "+id
        })
    })

}

exports.findOneByMatakuliah = (req, res) => {
    const nama = req.params.nama
    Mahasiswa.findAll({
        attributes: ['id', 'nama'],
        include: [{
            model: db.matakuliah,
            as: 'matakuliah',
            through: {where : {nama: nama}},
            attributes: ['id', 'nama']
        }]
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengambil data matakuliah dengan id "+err
        })
    })

}

exports.update = (req, res) =>{
    const id = req.params.id

    Matakuliah.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message:"Berhasil Update Matakuliah"
            })
        } else {
            res.send({
                message: "Gagal Update Matakuliah"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengupdate data matakuliah dengan id "+id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    
    Matakuliah.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Berhasil hapus data matakuliah"
            })
        } else {
            res.send({
                message: "Gagal hapus data matakuliah"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error saat hapus data matakuliah dengan id "+id
        })
    })
}

exports.deleteAll = (req, res) => {
    Matakuliah.destroy({
        where : {},
        truncate: false
    })
    .then(num => {
        res.send({
            message: `${num} Data matakuliah berhasil dihapus`
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "error menghapus semua data matakuliah"
        })
    })
}