const express = require('express');
const router = express.Router();

const PizzasModel = require('../models/PizzasModel');
require('../models/RestaurantesModel');

router.get('/:id([0-9a-z]{24})', (req, res) => {
    PizzasModel.findOne({ _id: req.params.id }).populate('restaurante').exec((err, data) => {
        if (err) {
            return res.send('error');
        }
        res.send(data);
    });
});

router.post('/', (req, res) => {
    const pizza = new PizzasModel(req.body);
    pizza.save((err) => {
        if (err) return res.send(err);
        res.send('ok');
    });
});

module.exports = router;