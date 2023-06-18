const express = require('express');
const router = express.Router();

//Configurando a Rota dentro de um grupo

//Utiliza o Router ao inves de app 
router.get('/home', (req, res) => {
    res.render("home/profile");
})


module.exports = router