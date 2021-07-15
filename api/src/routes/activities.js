const { Router } = require('express');
const router = Router();
const { createActivity, getAllActivities } = require("../controllers/activities");

router.post("/", createActivity);
router.get("/", getAllActivities);

module.exports = router;