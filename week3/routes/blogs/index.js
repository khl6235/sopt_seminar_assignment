const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/', require('./blogs'));
router.use('/:blogIdx/articles', require('./articles'));

module.exports = router;