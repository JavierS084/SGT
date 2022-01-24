const express = require('express');
const router = express.Router();
const passport = require('passport')
const pool = require('../database');



router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', passport.authenticate('local.signup', {
   successRedirect: '/users/signin', 
   failureRedirect: '/users/signup', 
   failureFlash: true
}));

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});


////////////////////////////////////lista de Usuarios
router.get('/users/list', async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM users');
    res.render('users/users',{users: usuarios});
});


router.get('/users/delete/:id', async (req, res) => {
    const  { id } = req.params;
    await pool.query('DELETE FROM users WHERE ID = ?', [id]);
    req.flash('success_msg', 'Form Delete Successfully');
    res.redirect('/users/list');
});


router.get('/users/edit/:id', async (req, res) => {
    const { id } = req.params;
    const users =  await pool.query('SELECT * FROM users WHERE ID = ?', [id]);
 
    res.render('users/edit', {user: users[0]})
});

//update
router.post('/users/edit/:id', async (req, res) => {
    const { id } = req.params;
    const {username, fullname, email, superuser, password} = req.body;
    const newUser = {
        username,
        fullname,
        email,
        superuser,
        password
    };
   await pool.query('UPDATE users set ? WHERE ID = ?', [newUser, id])
    
    res.redirect('/users/list');  
});
////////////////////////








router.post('/users/signin', (req, res, next) => {
    
    passport.authenticate('local.signin',{
    
        successRedirect: '/form/list',
        failureRedirect: '/users/signin',
        failureFlash: true
    
    
    })(req, res, next);
});




router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})

//route for error page
router.get("/error", function(req, res, next) {
res.render("error", {
    error: req.flash("error"),
});
});


module.exports = router;