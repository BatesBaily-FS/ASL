const express = require('express');
const twig = require('twig');
const app = express();
const path = require('path');


const fileUpload = require('express-fileupload');
app.use(fileUpload())

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, './views'))



app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const routers = require('./routers/index.js');

app.use('/planets', routers.planet);
app.use('/stars', routers.star);
app.use('/galaxies', routers.galaxy);


app.get('/', (req, res) => {
	res.render('layouts/index.html.twig')
})



app.listen(3000);
