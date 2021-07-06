const axios = require("axios");

const { Country } = require("../db");

const getAllCountries = async (req, res, next) => {

    try {
        const countryApi = await axios.get(`https://restcountries.eu/rest/v2/all`);
        // console.log(Object.keys(countryApi.data));
        const countriesArray = countryApi.data.map(
            country => ({
                id: country["alpha3Code"],
                name: country["name"],
                image: country["flag"],
                continent: country["region"],
                capital: country["capital"],
                region: country["subregion"],
                area: country["area"],
                population: country["population"],
            })
        );
        /*console.log(countriesArray);

         countriesArray.forEach( elem => 
            // const { id, name, image, continent, capital, region, area, population } = elem;
            Country.create({ elem })
        ); */
        return res.json(countriesArray.slice(0, 10));
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

module.exports = {
    getAllCountries,
}