const express = require("express");
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/add', authController.register);

module.exports = router;


