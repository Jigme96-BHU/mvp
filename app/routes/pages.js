const express = require("express");
const authController = require('../controllers/auth');
const upload = require("../lib/upload");
const uploadsingle = require("../lib/uploadsingle");

const router = express.Router();

router.get('/',(req,res)=>{
    res.render("index");
})

router.get('/pvv',(req,res)=>{
    res.render("pvv");
})

router.get('/val',(req,res)=>{
    res.render("val");
})

router.get('/mon',(req,res)=>{
    res.render("mon");
})
router.get('/var',(req,res)=>{
    res.render("verification");
})

router.get('/ver',(req,res)=>{
    res.render("Docvalidation");
})


router.post('/add',upload, authController.add);
router.post('/val',uploadsingle, authController.val);
router.post('/mon',upload, authController.mon);
router.post('/verify',uploadsingle,authController.verify)
module.exports = router;