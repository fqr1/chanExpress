var express = require('express');
var router = express.Router();

const saveController = require('../controllers/save');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({api:'v1'})
    //res.render('index', { title: 'Express' });
});

router.post('/save', saveController.save);

module.exports = router;