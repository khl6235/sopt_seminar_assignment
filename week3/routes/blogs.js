const express = require('express');
const router = express.Router();
const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const Blog = require('../model/blog');

router.get('/', (req, res)=>{
    Blog.readAll()
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.get('/:blogIdx', (req, res)=>{
    const blogIdx = req.params.blogIdx;
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.read(blogIdx)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.post('/', (req, res) => {
    const {blogIdx, blogName} = req.body;
    if(!blogIdx || !blogName){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.create(blogIdx, blogName)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.put('/', (req, res) => {
    const {blogIdx, blogName} = req.body;
    if(!blogIdx || !blogName){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.update(blogIdx, blogName)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

router.delete('/', (req, res) => {
    const {blogIdx} = req.body;
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Blog.delete(blogIdx)
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

module.exports = router;