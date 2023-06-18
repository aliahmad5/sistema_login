//Configurando o Passport
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Model do Usuario
require('../models/user.model');
const User = mongoose.model("User");

module.exports = function(passport){

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password'}, (email, password, done) => {

        User.findOne({email: email}).then((user) => {
            if(!user){
                return done(null, false, { message: "Está conta não existe!"})
            }

            bcrypt.compare( password, user.password, (error, check) => {

                if( check ){
                    return done(null, user);
                }
                else{
                    return done(null, false, { message: "Senha incorreta!" })
                }

            });

        })

    }));

    //Salvar os Dados do Usuario na sessão ao Logar
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(( user ) => {
            done(null, user)
        }).catch((error) => {
            done(null, false, { message: "Algo deu errado!" })
        })
    })

}

















// // const LocalStrategy = require('passport-local').Strategy;
// // const bcrypt        = require('bcrypt');

// // module.exports = function(passport, getUserByEmail, getUserById){

// //     passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {

// //         const user = getUserByEmail(email);
// //         if (user == null ){
// //             return done(null, false, {message: "E-mail inválido!"});
// //         }
// //         try{
// //             bcrypt.compare(password, user.passport, (error, verify) =>{
// //                 if(verify){
// //                     return done(null, user);
// //                 }
// //                 else{
// //                     return done(null, false, {message: "Senha Incorreta!"});
// //                 }
// //             })
// //         }
// //         catch(error){
// //             console.log(error);
// //             return done(error);
// //         }
// //     }))

// //     passport.serializeUser((user, done) => done(null, user.id));
// //     passport.deserializeUser((id, done) => {
// //         return done(null, getUserById(id))
// //     })
// // }
