const axios = require("axios");

const { Country } = require("../db");

const getAllCountries = async (req, res, next) => {
    const { name } = req.query;
    if (name) {
        const namedCountry = await Country.findOne({
            where: {
                name: name
            }
        });
        res.json(namedCountry);
    }


    /* const findCountries = await Country.findAll({
        limit: 10
    });
    console.log(findCountries);
    if (findCountries !== []) {
        console.log(findCountries);
        res.json(findCountries);
    } else { } */
       try {
            const countryApi = await axios.get(`https://restcountries.eu/rest/v2/all`);
            const countriesArray = countryApi.data.map(
                country => ({
                    id: country["alpha3Code"],
                    name: country["name"],
                    flag: country["flag"],
                    continent: country["region"],
                    capital: country["capital"],
                    region: country["subregion"],
                    area: country["area"],
                    population: country["population"],
                })
            );
            await Country.bulkCreate(countriesArray);
            const findCountries = await Country.findAll({
                limit: 10
            });
            res.json(findCountries)
        } catch (err) {
            next(err)
        }
    /* const countryApi = await axios.get(`https://restcountries.eu/rest/v2/all`);
    const countryMine = await Country.findAll();
    Promise.all([countryApi, countryMine])
        .then(resp => {
            let [countryApiRes, countryMineRes] = resp;
            return res.send(
                countryMineRes.concat(countryApiRes.data.results)
            );
        })
        .catch(err => next(err)); */
}

const getCountryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findCountry = await Country.findByPk(id);
        res.json(findCountry);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllCountries,
    getCountryById
}