const express = require('express');
const router = express.Router({mergeParams: true});
const authUtil = require('../../../module/authUtil');
const statusCode = require('../../../module/statusCode');
const responseMessage = require('../../../module/responseMessage');
const Article = require('../../../model/article');

// const multer = require('multer');
// const upload = multer({dest: 'uploads/'});
const upload = require('../../../config/multer');

//특정 blogIdx의 모든 article 조회 
router.get('/', (req, res)=>{
    const {blogIdx} = req.params;
    if(!blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.readAll({blogIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        console.log(blogIdx);
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

//article 작성
router.post('/', upload.array('image', 3), (req, res) => {
    const {title, content} = req.body;
    const {blogIdx} = req.params;
    const image = {file: req.files};

    if(!title || !content || !blogIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    
    //for(var i in image.file.length)

    Article.create({title, content, blogIdx, image})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

//article 수정
router.put('/', (req, res) => {
    const {title, content, articleIdx} = req.body;
    
    if(!title || !content || !articleIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.update({articleIdx, title, content})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

//article 삭제
router.delete('/', (req, res) => {
    const {articleIdx} = req.body;
    if(!articleIdx){
        res.status(statusCode.BAD_REQUEST)
        .send(authUtil.successFalse(responseMessage.NULL_VALUE));
        return;
    }
    Article.delete({articleIdx})
    .then(({code, json}) => {
        res.status(code).send(json);
    }).catch(err => {
        console.log(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(responseMessage.INTERNAL_SERVER_ERROR);
    });
});

module.exports = router;