const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/', require('./articles'));
router.use('/:articleIdx/comments', require('./comments'));

module.exports = router;