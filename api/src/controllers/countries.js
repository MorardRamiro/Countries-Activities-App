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
};

const getAllContinents = async (req, res, next) => {
  try {
     allContinents = await Country.findAll({
       attributes: ["continent"],
       group: "continent"
     });
     res.json(allContinents);
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

     let continent = {[Op.in]: ["Asia", "", "Oceania", "Africa", "Polar", "Europe", "Americas"]};
    if (req.query.continent && typeof(req.query.continent) === "string") {
      continent = req.query.continent;
    };

    let searchArray = {
      limit: 10,
      offset: page * 10,
      attributes: {
        exclude: ['capital', 'region', 'area', 'createdAt', 'updatedAt']
      },
      where: {
        continent: continent
      }, 
      order: [[orderBy, order]],
      include: [Activity]
    };

    if(req.query.activity) {
      searchArray = {...searchArray, include: {model: Activity, where: {name: req.query.activity}}}
    };

    if (name) {
      const namedCountries = await Country.findAndCountAll({
        ...searchArray,
        where: { ...searchArray.where,
          name: {
            [Op.iLike]: `%${name}%`

          } ,
        },
        
      });
      if (!namedCountries.count) {
        res.json(`There is no country with "${name}" in it's name`)
      }
      return res.json(namedCountries);
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
          population: country["population"],
          /* capital: country["capital"],
          region: country["subregion"],
          area: country["area"], */     
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
    const searchObj = {
      include: Activity,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
    const findCountry = await Country.findByPk(id, searchObj);
    if (!findCountry.dataValues.region || !findCountry.dataValues.area || !findCountry.dataValues.capital) {
      const countryDetails = await axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`);
      const countryUpdates = {
        region: countryDetails.data["subregion"],
        area: countryDetails.data["area"],
        capital: countryDetails.data["capital"],
      };
      await Country.update(countryUpdates, { where: { id: id } });
      const findCountry2 = await Country.findByPk(id, searchObj);
      res.json(findCountry2);

    } else {
      res.json(findCountry);
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAllCountries,
  getCountryById,
  getCountriesToSelect,
  getAllContinents
}