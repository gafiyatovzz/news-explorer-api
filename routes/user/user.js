const express = require('express');

const router = express.Router();

const controller = require('../../controllers/user');

router.get('/me', controller.getUser);

module.exports = router;
