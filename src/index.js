const express = require ('express');
const path = require('path');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const  session = require('express-session');
const  MysqlStore = require('express-mysql-session');
const flash = require ('connect-flash');
const passport = require('passport');
const { database } = require('./keys');


//Initialization

const app = express();
require('./lib/passport');


//Settings
app.set('port', process.env.PORT || 4030);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', engine({ //configuracion de HANDLEBARS   
    
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path .join(app.get('views'), 'partials'),
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs')



//Middlewares
app.use(session({
    secret: 'sgt2386',
    resave: false,
    saveUninitialized: false,
    store: new MysqlStore(database), //para almacenar la session en la base de datos
}));


app.use(flash());
app.use(morgan('dev')); //muestra las peticiones que llegan por consola al server
app.use(express.urlencoded({extended: false})); //para aceptar desde el formulario los datos que envien los usuarios y solo formato string
app.use(express.json()); //para enviar y recibir archivos JSON
app.use(passport.initialize());
app.use(passport.session());



//Global variables
app.use((req, res, next) => { //toma la informacion del usuario, reponde el servidor y continua con el codigo
   app.locals.success = req.flash('success');
   app.locals.message = req.flash('message');
   app.locals.error = req.flash('error');
  app.locals.user = req.user || null;
    next();
});


//Routes

app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use('/form', require('./routes/form'));


//Public

app.use(express.static(path.join(__dirname, 'public')));



//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});