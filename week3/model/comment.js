const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/poolAsync');

const comment = {
    //article 생성
    create: ({comContent, comWriterIdx, articleIdx}) => {
        const table = 'comment';
        const fields = 'comContent, comWriterIdx, articleIdx';
        const questions = `'${comContent}', '${comWriterIdx}', '${articleIdx}'`;//?, ?, ?
        const query = `INSERT INTO ${table} (${fields}) VALUES(${questions})`;
        const values = [comContent, comWriterIdx, articleIdx];

        return pool.queryParam_None(query)
        .then(result => {
            //const insertId = result.insertId;
            if(!result){
                return{
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.CREATE_COMMENT_FAIL)
                };
            }
            return{
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.CREATE_COMMENT_SUCCESS, values)
            };
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
        
    },
/*
    //특정 article 번호로 조회
    read: ({blogIdx, articleIdx}) => {
        const table = 'article';
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}' AND articleIdx = '${articleIdx}'`;
        return pool.queryParam_None(query)
        .then(result => {
            const article = result[0];
            if(!article){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_ARTICLE)
                };
            }
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, result)
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    },

    //특정 blog의 모든 article 조회
    readAll: ({blogIdx}) => {
        const table = 'article';
        const query = `SELECT * FROM ${table} WHERE blogIdx = '${blogIdx}'`;
        return pool.queryParam_None(query)
        .then(result => {
            const article = result[0];
            if(!article){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_ARTICLE)
                };
            }
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.GET_ARTICLE_SUCCESS, result)
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    },

    //article 수정
    update: ({articleIdx, title, content}) => {
        const table = 'article';
        const query = `UPDATE ${table} SET title = '${title}', content = '${content}' WHERE articleIdx = ${articleIdx}`;
        return pool.queryParam_None(query)
        .then(result => {
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.UPDATE_ARTICLE_SUCCESS)
            };
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    },

    //blog 삭제
    delete: ({articleIdx}) => {
        const table = 'article';
        const query = `DELETE FROM ${table} WHERE articleIdx = ${articleIdx}`;
        return pool.queryParam_None(query)
        .then(result => {
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.DELETE_ARTICLE_SUCCESS)
            };
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }*/
};

module.exports = comment;