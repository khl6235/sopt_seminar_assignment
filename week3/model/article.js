const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/poolAsync');

const article = {
    //article 생성
    create: ({title, content, blogIdx}) => {
        const table = 'article';
        const fields = 'title, content, blogIdx';
        const questions = `?, ?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [title, content, blogIdx];
        return pool.queryParam_Parse(query, values)
        .then(result => {
            const insertId = result.insertId;
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, insertId)
            }
        })
        .catch(err => {
            // ER_NO_REFERENCED_ROW_2
            if (err.errno == 1452) {
                console.log(err.errno, err.code);
                return {
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse([responseMessage.BOARD_CREATE_FAIL, responseMessage.NO_USER].join(','))
                };
            }
            console.log(err);
            throw err;
        })
    },
    //특정 article 조회
    read: ({blogIdx, articleIdx}) => {
        const table = 'article';
        const query = `SELECT * FROM ${table} WHERE blogIdx = ${blogIdx} AND articleIdx = ${articleIdx}`;
        return pool.queryParam_None(query)
        .then(result => {
            const article = result[0];
            if(!article){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                };
            }
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, article)
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    },
    //모든 article 조회
    readAll: () => {
        const table = 'article';
        const query = `SELECT * FROM ${table}`;
        return pool.queryParam_None(query)
        .then(result => {
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
    //article 수정
    update: ({blogIdx, articleIdx, title, content}) => {
        const table = 'article';
        const query = `UPDATE ${table} SET title = '${title}', content = '${content}' WHERE blogIdx = ${blogIdx} AND articleIdx = ${articleIdx}`;
        return pool.queryParam_None(query)
        .then(result => {
            console.log(result);
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS)
            };
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    },
    //blog 삭제
    delete: ({blogIdx, articleIdx}) => {
        const table = 'article';
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx} AND articleIdx = ${articleIdx}`;
        return pool.queryParam_None(query)
        .then(result => {
            console.log(result);
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
            };
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }
};

module.exports = article;