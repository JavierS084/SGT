const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const helpers = require('../lib/helpers');
const pool = require('../database');

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const{ fullname, email, superuser } = req.body;
  
    const newUser = {
        username,
        password,
        fullname,
        email,
        superuser
    }
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser)
  
}));

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) =>{

   
   
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
    if (rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword){
            done(null, user, req.flash('success','Bienvenido ' + user.username));
        }else{
            done (null, false, req.flash('message','Contrase&ntilde;a  incorrecta'));
        }
        
    }else{
        return done (null, false , req.flash('message','Este usuario no existe'));

    }
}));



passport.serializeUser((user, done) => { 
    done(null, user.id);

});


passport.deserializeUser(async (id, done) => {
    const rows = await  pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);

});
