const { Router } = require('express');
const { getAllCountries, getCountryById, getCountriesToSelect } = require("../controllers/countries");
const router = Router();

router.get("/", getAllCountries);
router.get("/all", getCountriesToSelect);
router.get("/:id", getCountryById);




module.exports = router;