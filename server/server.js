// server.js: Configura e inicia o servidor Express para gerenciar 
// requisições HTTP. Serve como ponto de entrada 
// principal para o backend da aplicação.

const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"users" : ["userOne", "UserTwo", "userThree"] })
})

app.listen(5000, () => (console.log('server started on port 5000')))