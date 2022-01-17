const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.render('index');
});
router.get('/form',(req, res) => {
    res.render('forms/forms');
});


module.exports = router;