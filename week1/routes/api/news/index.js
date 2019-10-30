var express = require('express');
var router = express.Router();

//base : localhost:3000

//localhost:3000/api/cafe

 router.use('/like', require('./like'));
 router.use('/news', require('./news'));

router.get('/', (req, res) => {
    res.send('NEWS Index 페이지');
})

module.exports = router;