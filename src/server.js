const express = require('express')
const path = require ('path')
const cors = require('cors')
const routes= require('./routes/route')

const app = express()

app.use(express.json());

app.use(cors())

app.use(express.urlencoded({extended:true}))

//rotas
app.use('/', routes)




//executando o servidor
const port = process.env.PORT || 3333
app.listen(port, ()=> console.log(`Server is listening on port ${port}`))