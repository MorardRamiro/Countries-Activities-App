const { Router } = require('express');
const { getAllCountries } = require("../controllers/countries");
const router = Router();

router.get("/", getAllCountries);

/*  GET /countries:
En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe almacenar solo los datos necesarios para la ruta principal)
Obtener un listado de los primeros 10 países
*/
/* router.get("/:idPais", (req, res) => {
    const { idPais } = req.params;
}); */

/*
 GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes
*/
/* router.get("/notget", (req, res) => {
    const { name } = req.query;
}); */
/*
 GET /countries?name="...":
Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
Si no existe ningún país mostrar un mensaje adecuado
*/

module.exports = router;