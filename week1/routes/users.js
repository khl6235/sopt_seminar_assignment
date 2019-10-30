var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log('getUser')
    res.send('respond with a resource')
});

module.exports = router;