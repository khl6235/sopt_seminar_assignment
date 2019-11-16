const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/', require('./articles'));

module.exports = router;