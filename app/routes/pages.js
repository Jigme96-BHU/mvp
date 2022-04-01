const express = require("express");
const authController = require('../controllers/auth');
const upload = require("../lib/upload");

const router = express.Router();

router.get('/',(req,res)=>{
    res.render("pvv");
})

router.post('/add',upload, authController.add);

module.exports = router;