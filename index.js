//Importando Express
require('./modules/express');

//Importando Dotenv
const dotenv = require('dotenv');

//Importando Database
const connectToDatabase = require('./src/database/connect');

dotenv.config(); 
connectToDatabase();
