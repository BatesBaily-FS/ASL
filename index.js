const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const routers = require('./routers/index.js');

app.get('/', (req, res) => {
	res.status(200).send('Welcome to Star Tracker Library');
});

app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

app.listen(3000);
