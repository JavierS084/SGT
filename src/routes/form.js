const express = require('express');
const router = express.Router();
const { authenticated: authenticated} = require('../lib/auth');
const pool = require('../database');//hace referencia a la conexion base de datos 



router.get('/add', (req, res) => {
    res.render('forms/add');
});


router.post('/add', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Please Write a Title'});
    }

    if(!description) {
        errors.push({text: 'Please Write a Description'});

    }

    if(errors.length > 0) {
        res.render('forms/add', {
            errors,
            title,
            description

        });
    } else {
        const newForm = new Form({ title, description});
        await newForm.save();
        req.flash('success_msg', 'Note Added Successfully');
        res.redirect('/list');
    }
   
});
//list
/*
router.get('/forms/list/solicitudes', authenticated, async (req, res) => {
    //const forms = await Form.find({user: req.user.id}).sort({date: 'desc'}).lean();
    res.render('forms/forms');
   
});
*/

router.get ('/list', (req, res) => {
   
    res.render('forms/forms');
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