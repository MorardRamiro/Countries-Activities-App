const { Activity } = require("../db");

const createActivity = async (req, res, next) => {
    try {
        const { id, name, difficulty, duration, season } = req.body;
        if (!id || !name || !difficulty || !duration || !season) return res.send("NO");
        const createdActivity = await Activity.create({ 
            id: id, 
            name: name,
            difficulty: difficulty, 
            duration: duration, 
            season: season
        });
        res.json(createdActivity);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createActivity
}