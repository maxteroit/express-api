const db = require("../models")
const User = db.user
const Op = db.Sequelize.Op
const bcrypt = require("bcryptjs")
const auth = require("../config/auth.config")
const jwt = require("jsonwebtoken")

exports.signUp = (req, res) => {
    if(!req.body.username){
        res.status(400).send({
            message: "Username Tidak Boleh Kosong!"
        })
        return
    } else if(!req.body.password){
        res.status(400).send({
            message: "Password TIdak Boleh Kosong!"
        })
        return
    } else {
        const user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),
        }

        User.create(user).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error"
            })
        })
    }
}

exports.signIn = (req, res) => {
    User.findOne({
        where: {username : req.body.username}
    }).then(datauser => {
        if(!datauser){
            return res.status(404).send({
                message: "Teuing eta username saha"
            })
        } else {
            let isValidPassword = bcrypt.compareSync(req.body.password, datauser.password)
            if(!isValidPassword){
                return res.status(401).send({
                    message: "Username atau Password nu batur meren eta mah"
                })
            } else {
                let token = jwt.sign({id:datauser.id}, auth.secret, {
                    expiresIn : 86400 // 24 jam

                })

                res.status(200).send({
                    id: datauser.id,
                    username: datauser.username,
                    accessToken: token,
                })
            }
        }
    })
}

exports.findAll = (req, res) => {
    const username = req.query.username
    var kondisi = username ? {username: {[Op.like]: `%${username}%`}} : null

    User.findAll({where: kondisi})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Terjadi Kesalahan Saat Mengambil Data User"
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengambil data user dengan id "+id
        })
    })

}

exports.update = (req, res) =>{
    const id = req.params.id

    User.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message:"Berhasil Update User"
            })
        } else {
            res.send({
                message: "Gagal Update User"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Error saat mengupdate data user dengan id "+id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id
    
    User.destroy({
        where: {id: id}
    })
    .then(num => {
        if(num == 1){
            res.send({
                message: "Berhasil hapus data user"
            })
        } else {
            res.send({
                message: "Gagal hapus data user"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error saat hapus data user dengan id "+id
        })
    })
}

exports.deleteAll = (req, res) => {
    User.destroy({
        where : {},
        truncate: false
    })
    .then(num => {
        res.send({
            message: `${num} Data user berhasil dihapus`
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "error menghapus semua data user"
        })
    })
}