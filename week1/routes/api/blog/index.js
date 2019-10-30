var express = require('express');
var router = express.Router();

//base : localhost:3000

//localhost:3000/api/blog

// router.use('/signin', require('./signin'));
 router.use('/blog', require('./blog'));

router.get('/', (req, res) => {
    res.send('BLOG Index 페이지');
})

module.exports = router;