const { Activity, Country } = require("../db");
const { Op } = require("sequelize");

const createActivity = async (req, res, next) => {
    try {
        const { name, difficulty, duration, season, countries } = req.body;
        /* if (!id || !name || !difficulty || !duration || !season || !countries) return res.send("NO"); */
        const createdActivity = await Activity.create({ 
            
            name: name,
            difficulty: Number(difficulty), 
            duration: duration, 
            season: season,
            countries: countries
        });
        const findCountries = await Country.findAll({
            where: { id: {
                [Op.in]: countries
              }
            }
        });
        await createdActivity.addCountries(findCountries);
        res.json(createdActivity);
        
        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createActivity
}