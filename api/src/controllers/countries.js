const axios = require("axios");

const { Country } = require("../db");

const getAllCountries = async (req, res, next) => {

    try {
        const countryApi =  await axios.get(`https://restcountries.eu/rest/v2/all`);
        return countryApi ? res.json(countryApi) : res.sendStatus(404)
    } catch (err) {
        next(err)
    }
    

    /* const countryApi =  await axios.get(`https://restcountries.eu/rest/v2/all`);
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

module.exports = {
    getAllCountries,
}