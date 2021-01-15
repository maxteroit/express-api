module.exports = (sequelize,Sequelize) => {
    const Mahasiswa = sequelize.define("mahasiswa", {
        nama: {
            type: Sequelize.STRING
        },
        jurusan: {
            type: Sequelize.STRING
        },
        angkatan: {
            type: Sequelize.INTEGER
        },
        nim: {
            type: Sequelize.STRING
        }
    })

    return Mahasiswa
}

