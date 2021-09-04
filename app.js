const path = require('path');
const mongoose = require('mongoose');

const session = require('express-session');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/examen', { useNewUrlParser: true });

app.use(session({
    secret: 'Es un secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded());

app.engine('pug', require('pug').__express)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    req.custom = { error: req.session.error };
    if (!req.custom) req.custom = {};
    next();
});

app.use('/pizzas', require('./routes/pizzas'));
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
    res.render('mensaje', {msg: 'Hola bienvenido/a'});
});

app.get('*', (req, res) => {
    res.render('mensaje', {msg: 'ERROR 404: SITIO NO ENCONTRADO'});
});

app.listen(PORT, () => {
    console.log(`Listening to localhost:${PORT}`);
});