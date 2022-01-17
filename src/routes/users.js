const express = require('express');
const router = express.Router();
const passport = require('passport')




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