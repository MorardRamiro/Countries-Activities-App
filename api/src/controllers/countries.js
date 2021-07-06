const axios = require("axios");
const { Op } = require("sequelize");

const { Country } = require("../db");
const { Activity } = require("../db");

const getAllCountries = async (req, res, next) => {
    
    const { name } = req.query;
    if (name) {
        try {
            const namedCountry = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                }
            });
            res.json(namedCountry);
        } catch (err) {
            next(err)
        } 
    }
    const findCountries = await Country.findAll({
        limit: 10,
        offset: req.query.page,
        attributes: {
            exclude: ['id','capital', 'region', 'area', 'population', 'createdAt', 'updatedAt']
            },
        /* order: [["name", req.query.order]] */
    });
    if (findCountries.length) {
        res.json(findCountries);
    } else { 
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
                limit: 10,
                offset: req.query.page,
                attributes: {
                    exclude: ['id','capital', 'region', 'area', 'population', 'createdAt', 'updatedAt']
                },
                /* order: [["name", req.query.order]] */
                /* include: { model: Activity } */
            });
            res.json(findCountries)
        } catch (err) {
            next(err)
        }
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
        const findCountry = await Country.findByPk(id, {include: Activity});
        res.json(findCountry);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllCountries,
    getCountryById
}