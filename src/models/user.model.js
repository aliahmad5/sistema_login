//Define a estrutura de dados dentro do banco
//Modelo de Dados 
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Criando a model
const UserModel = mongoose.model("User", userSchema);

//Exportar
module.exports = UserModel;
