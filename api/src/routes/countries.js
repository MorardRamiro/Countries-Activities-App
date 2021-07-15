const { Router } = require('express');
const { getAllCountries, getCountryById, getCountriesToSelect, getAllContinents } = require("../controllers/countries");
const router = Router();

router.get("/", getAllCountries);
router.get("/all", getCountriesToSelect);
router.get("/continents", getAllContinents);
router.get("/:id", getCountryById);




module.exports = router;