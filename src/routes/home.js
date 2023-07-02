const express = require('express');
const router = express.Router();

//Configurando a Rota dentro de um grupo

// Utiliza o Router ao inves de app 
router.get('/profile', (req, res) => {
    res.render('profile', { username: res.locals.username });
})


module.exports = router