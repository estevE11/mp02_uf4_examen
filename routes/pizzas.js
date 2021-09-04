const express = require('express');
const router = express.Router();

const PizzasModel = require('../models/PizzasModel');
require('../models/RestaurantesModel');

router.get('/', (req, res) => {
    PizzasModel.find().populate('restaurante').sort({ nombre: 'asc' }).exec((err, data) => {
        if (err) {
            console.log(err);
        }
        req.session.error = '';
        res.render('pizzas', { pizzas: data, params: req.custom });
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    PizzasModel.findByIdAndDelete(id, req.body, (err, data) => {
        if (!data) {
            req.session.error = 'No se pudo eliminar la pizza';
            res.redirect('/pizzas');
            return;
        }
        req.session.error = '';
        res.redirect(`/pizzas`);
    });
});

module.exports = router;