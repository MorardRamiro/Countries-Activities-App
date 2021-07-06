const { Router } = require('express');

/* var express = require('express');
var app = express();
app.use(express.json()); */
const router = Router();
/* router.use(express.json()); */
/* app.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.urlencoded({
    extended: true
})); */

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require("./countries");
const activityRouter = require("./activities");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryRouter);
router.use('/activities', activityRouter);

module.exports = router;
