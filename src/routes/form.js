const express = require('express');
const router = express.Router();
const { authenticated: authenticated} = require('../lib/auth');
const pool = require('../database');//hace referencia a la conexion base de datos 



router.get('/add', (req, res) => {
    res.render('forms/add');
});


router.post('/add', async (req, res) => {
    console.log(req.body);
    const { title, description, dependencia, cargo, others } = req.body;

    const newForm = { title, description, dependencia, cargo, others};
    await pool.query('INSERT INTO forms set ?', [newForm]);
    req.flash('success_msg', 'Solicitud Added Successfully');
    res.redirect('/form/list');
    
});


router.get('/list', async(req, res) => {
    const forms = await pool.query('SELECT * FROM forms');
    console.log(forms);
    res.render('forms/forms',{forms: forms});
  });
  
router.get('/delete/:id', async (req, res) => {
    const  { id } = req.params;
    await pool.query('DELETE FROM forms WHERE ID = ?', [id]);
    req.flash('success_msg', 'Form Delete Successfully');
    res.redirect('/form/list');
});


router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE FROM forms WHERE ID = ?', [id]);
    res.render('form/forms')
});

//update
router.put('/edit/:id', async (req, res) => {
   // const {title, description, dependencia, cargo, others}= req.body;
    const { id } = req.params;
    await pool.query('UPDATE FROM forms WHERE ID = ?', [id]);
    req.flash('success_msg', 'Form Update Successfully')
    res.redirect('/form/list');
});



module.exports = router; 