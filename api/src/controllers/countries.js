const axios = require("axios");
const { Op } = require("sequelize");

const { Country, Activity } = require("../db");

const getCountriesToSelect = async (req, res, next) => {
  try {
    const allCountries = await Country.findAndCountAll({
      attributes: {
        exclude: ["flag", "continent", "population", 'capital', 'region', 'area', 'createdAt', 'updatedAt']
      }
    });
    res.json(allCountries);
  } catch (err) {
    next(err)
  }
}

const getAllCountries = async (req, res, next) => {
  try {
    const { name } = req.query;

    const pageAsNumber = Number.parseInt(req.query.page);
    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    };

    let order = "ASC";
    if (req.query.order && req.query.order.toUpperCase() === "DESC") {
      order = req.query.order;
    };

    let orderBy = "name";
    if (req.query.orderBy && req.query.orderBy.toUpperCase() === "POPULATION") {
      orderBy = req.query.orderBy;
    };

    const searchArray = {
      limit: 10,
      offset: page * 10,
      attributes: {
        exclude: ['capital', 'region', 'area', 'createdAt', 'updatedAt']
      },
      order: [[orderBy, order]],
      include: [Activity]
    };

    if (name) {
      const namedCountries = await Country.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`
          }
        },
        ...searchArray
      });
      if (!namedCountries.count) {
        res.json(`There is no country with "${name}" in it's name`)
      }
      res.json(namedCountries);
    }

    const findCountries = await Country.findAndCountAll({
      ...searchArray
    });
    if (findCountries.count) {
      res.json(findCountries);
    } else {
      const countryApi = await axios.get(`https://restcountries.eu/rest/v2/all`);
      const countriesArray = countryApi.data.map(
        country => ({
          id: country["alpha3Code"],
          name: country["name"],
          flag: country["flag"],
          continent: country["region"],
          capital: country["capital"],
          /* region: country["subregion"],
          area: country["area"], */
          population: country["population"],
        })
      );
      await Country.bulkCreate(countriesArray);
      const findCountries = await Country.findAndCountAll({
        ...searchArray
      });
      res.json(findCountries)
    }
  } catch (err) {
    next(err)
  }
}

const getCountryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findCountry = await Country.findByPk(id, { include: Activity });
    if (!findCountry.dataValues.region || !findCountry.dataValues.area) {
      const countryDetails = await axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`);
      const countryUpdates = {
        region: countryDetails.data["subregion"],
        area: countryDetails.data["area"]
      };
      await Country.update(countryUpdates, { where: { id: id } });
      const findCountry2 = await Country.findByPk(id, { include: Activity });
      res.json(findCountry2);

    } else {
      res.json(findCountry);
    }
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
module.exports = {
  getAllCountries,
  getCountryById,
  getCountriesToSelect
}