//Fazer a Conexão com o Banco de Dados
const mongoose = require("mongoose");

const connectToDatabase = async () => {

    //Fzer a conexao passando a url ao configurar o Mongo DB
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.dw44jdn.mongodb.net/database`, { 
    },)
    .then(() => {
        console.log("Conectado ao Banco com Sucesso!");
    })
    .catch((error) => {
        console.log("Erro ao se Conectar com o banco: ", error);
    })

}

module.exports = connectToDatabase;