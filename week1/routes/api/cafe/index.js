var express = require('express');
var router = express.Router();

//base : localhost:3000

//localhost:3000/api/cafe

// router.use('/signin', require('./signin'));
 router.use('/cafe', require('./cafe'));

router.get('/', (req, res) => {
    res.send('CAFE Index 페이지');
})

module.exports = router;