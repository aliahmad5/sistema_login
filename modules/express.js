if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

//Criando o servidor com o Express
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash   = require('connect-flash');
const methodOverride = require('method-override');
const UserModel = require('../src/models/user.model');
const bcrypt = require("bcrypt");
const passport = require('passport');
const home = require('../src/routes/home');
require('../src/auth/passport-config')(passport);

const app = express();
const port = 8080;

app.use(express.json());
app.use(methodOverride('_method'));

//Configurações 

//Sessão
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(flash());

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('error')
    next();
})

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({ extended: false }));


//Rotas

//Login
app.get('/', checkNotAuthenticated, (req, res) => {
	res.render("login");
});

//Home
app.get("/home", checkAuthenticated,  (req, res) => {
	res.render("home", { user: req.user.username });
})

app.post('/', (req, res, next) => {

    passport.authenticate("local", {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
});

//Logout
app.delete('/logout', (req, res) => {
    req.logout(req.user, error => {
        if(error){
            return next(error);
        }
        else {
            res.redirect('/');
        }
    })
});

//Verificar se Usuario esta autenticado
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

//Verificar se Usuario não esta autenticado
function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/home");
    }
    next();
}

/* ----- REGISTER ----- */ 
//Register
app.get('/register', checkNotAuthenticated,  async (req, res) => {
    res.status(200).render('register');
});

//Criando no Banco
app.post('/register', async (req, res) => {
    
    const hashedPasword = await bcrypt.hash(req.body.password, 10); //Criando Hash
    
    try {
        const users = await UserModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPasword
        });

        console.log(users);
        res.render("login");
    }
    catch( error ){
        res.status(500).send(error.message);
    }

});


//Rotas - Home
app.use('/home', home)




/* -------------------- */ 

app.listen(port, () => {
    console.log(`Rodando na Porta: ${port}`)
})