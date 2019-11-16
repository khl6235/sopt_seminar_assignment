const express = require('express');
const router = express.Router({mergeParams: true});
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const Article = require('../../../model/article');

router.get('/', (req, res)=>{
    const blogIdx = req.params.blogIdx;
    Article.readAll()
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.get('/:articleIdx', (req, res)=>{
    const {blogIdx, articleIdx} = req.params;
    if(!blogIdx || !articleIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.read({blogIdx, articleIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.post('/', (req, res) => {
    const {title, content} = req.body;
    const {blogIdx} = req.params;

    if(!title || !content || !blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.create({title, content, blogIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.put('/:articleIdx', (req, res) => {
    const {title, content} = req.body;
    const {blogIdx, articleIdx} = req.params;

    if(!title || !content || !blogIdx || !articleIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.update({blogIdx, articleIdx, title, content})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.delete('/', (req, res) => {
    const {blogIdx, articleIdx} = req.params;
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.delete({blogIdx, articleIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

module.exports = router;