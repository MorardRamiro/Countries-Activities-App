const { Router } = require('express');
const router = Router();
const { createActivity } = require("../controllers/activities");

router.post("/", createActivity)

module.exports = router;