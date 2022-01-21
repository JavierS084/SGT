const express = require('express');
const router = express.Router();
const { authenticated: authenticated} = require('../lib/auth');
const pool = require('../database');//hace referencia a la conexion base de datos 



router.get('/add', (req, res) => {
    res.render('forms/add');
});


router.post('/add', async (req, res) => {
    console.log(req.body);
    const { title, description, dependencia, cargo, others} = req.body;
    const newForm = { title, description, dependencia, cargo, others};
    await pool.query('INSERT INTO forms set ?', [newForm]);
    req.flash('success_msg', 'Solicitud Added Successfully');
    res.redirect('/form/list');
    
});


router.get('/list', async(req, res) => {
    const forms = await pool.query('SELECT * FROM forms');
    res.render('forms/forms',{form: forms});
});


router.get('/delete/:id', async (req, res) => {
    const  { id } = req.params;
    await pool.query('DELETE FROM forms WHERE ID = ?', [id]);
    req.flash('success_msg', 'Form Delete Successfully');
    res.redirect('/form/list');
});


router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const forms =  await pool.query('SELECT * FROM forms WHERE ID = ?', [id]);
    console.log(forms);
    res.render('forms/edit', {form: forms[0]})
});

//update
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const {title, description, dependencia, cargo, others} = req.body;
    const newForm = {
        title,
        description,
        dependencia,
        cargo,
        others
    };
   await pool.query('UPDATE forms set ? WHERE ID = ?', [newForm, id])
    req.flash('success_msg', 'Form Update Successfully')
    res.redirect('/form/list');  
});



module.exports = router; 