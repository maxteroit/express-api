module.exports = (sequelize,Sequelize) => {
    const Matakuliah = sequelize.define("matakuliah", {
        nama: {
            type: Sequelize.STRING
        },
        kode: {
            type: Sequelize.STRING
        }
    })

    return Matakuliah
}