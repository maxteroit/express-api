const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

var corsOption = {
    origin: "http://localhost:8080"
}

app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const db = require("./app/models")
db.sequelize.sync({force:false}).then(()=>{
    console.log("Drop and re-sync db")
})

app.get('/', (req,res) => {
    res.json({message: "Membuat API Menggunakan Express"})
})

require("./app/routes/mahasiswa.routes")(app)
require("./app/routes/user.routes")(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log("Server Running on PORT "+PORT)
})