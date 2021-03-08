// va récupérer les valeurs qui sont dans le fichier .env et les mettre dans les variables d'environnement de l'application
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./app/router');

app.set('view engine', 'ejs');
app.set('views', './app/views')

app.use(express.static('public'));
app.use(router);

app.use(function(req, res) {
    res.status(404).send("Désolé cette page n'éxiste pas !");
});

app.listen(port, () => {
    console.log(`Server listen http://localhost:${port}`);
});