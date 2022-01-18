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
//list
/*
router.get('/forms/list/solicitudes', authenticated, async (req, res) => {
    //const forms = await Form.find({user: req.user.id}).sort({date: 'desc'}).lean();
    res.render('forms/forms');
   
});
*/

router.get('/list', async(req, res) => {
    const forms = await pool.query('SELECT * FROM forms');
    console.log(forms);
    res.render('forms/forms',{forms: forms});
  });
  

    
    
/*
//edit
router.get('/forms/edit/:id',authenticated, async (req, res) => {
    const form = await Form.findById(req.params.id).lean();
    res.render('notes/edit-note', {form})
});
//update
router.put('/notes/edit-note/:id',authenticated, async (req, res) => {
    const {title, description }= req.body;
    await Form.findByIdAndUpdate(req.params.id, { title, description});
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
});

//delete
router.delete('/notes/delete/:id',authenticated, async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note Delete Successfully');
   res.redirect('/notes');
});
*/

module.exports = router; 