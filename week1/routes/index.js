var express = require('express');
var router = express.Router();

//base : localhost:3000

//localhost:3000/api/blog
//localhost:3000/api/cafe
//localhost:3000/api/news
router.use('/api/blog', require('./api/blog'));
router.use('/api/cafe', require('./api/cafe'));
router.use('/api/news', require('./api/news'));

router.get('/', (req, res) => {
    res.send('처음 페이지');
})

module.exports = router;