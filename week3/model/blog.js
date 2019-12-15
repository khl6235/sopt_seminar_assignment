const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/poolAsync');

module.exports = {
    //blog 생성
    create: ({blogName, writerIdx}) => {
        const table = 'blog';
        const fields = 'blogName, writerIdx';
        const questions = `?, ?`;
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        const values = [blogName, writerIdx];
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
    //특정 blog 조회
    read: ({blogIdx}) => {
        const table = 'blog';
        const query = `SELECT * FROM ${table} WHERE blogIdx = ${blogIdx}`;
        return pool.queryParam_None(query)
        .then(result => {
            const blog = result[0];
            if(!blog){
                return {
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.NO_BOARD)
                };
            }
            return {
                code: statusCode.OK,
                json: authUtil.successTrue(responseMessage.BOARD_CREATE_SUCCESS, blog)
            }
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
    },
    //모든 blog 조회
    readAll: () => {
        const table = 'blog';
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
    //blog 수정
    update: ({blogName, blogIdx}) => {
        const table = 'blog';
        const query = `UPDATE ${table} SET blogName = '${blogName}' WHERE blogIdx = ${blogIdx}`;
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
    delete: ({blogIdx}) => {
        const table = 'blog';
        const query = `DELETE FROM ${table} WHERE blogIdx = ${blogIdx}`;
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