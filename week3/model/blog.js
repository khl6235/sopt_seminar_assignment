const authUtil = require('../module/authUtil');
const statusCode = require('../module/statusCode');
const responseMessage = require('../module/responseMessage');
const pool = require('../module/pool');

//const table = 'blog';
const blogDB = [];

module.exports = {
    //blog 생성
    create: (blogIdx, blogName) => {
        return new Promise((resolve, reject) => {
            //blog명 중복 체크
            if (blogDB.filter(it => it.blogName == blogName).length > 0) {
                resolve({
                    code: statusCode.BAD_REQUEST,
                    json: authUtil.successFalse(responseMessage.ALREADY_ID)
                })
                return;
            }
            //blog 생성 성공
            const blog = {
                blogIdx,
                blogName
            };
            blogDB.push(blog);
            const result = blog;

            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, result)
            });
        });
    },
    //특정 blog 조회
    read: (blogIdx) => {
        return new Promise((resolve, reject) => {
            //blog 아이디 확인
            if(blogIdx > blogDB.length){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.OUT_OF_VALUE)
                })
                return;
            }

            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.BOARD_READ_ALL_SUCCESS, blogDB[blogIdx])
            });
        });
    },
    //모든 blog 조회
    readAll: () => {
        return new Promise((resolve, reject) => {
            //성공
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.SIGN_IN_SUCCESS, blogDB)
            });
        });
    },
    //blog 수정
    update: (blogIdx, blogName) => {
        return new Promise((resolve, reject) => {
            //blog 아이디 확인
            if(blogIdx > blogDB.length){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.OUT_OF_VALUE)
                });
                return;
            }
            
            //blogName 바뀌는지 확인
            if(blogDB[blogIdx].blogName != blogName){
                resolve({
                    code:statusCode.FORBIDDEN,
                    json:authUtil.successFalse(responseMessage.MISS_MATCH_PW)
                });
                return;
            }

            blogDB[blogIdx].blogName = blogName; //id값은 못바꾸게

            //업데이트 완료
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.BOARD_UPDATE_SUCCESS, blogDB[blogIdx])
            });
            
            //왜 서버내부오류 가 날까.....ㅜㅜ
        });
    },
    delete: (blogIdx) => {
        return new Promise((resolve, reject) => {
            //blog id 확인
            if(blogIdx > blogDB.length){
                resolve({
                    code:statusCode.BAD_REQUEST,
                    json:authUtil.successFalse(responseMessage.NO_BOARD)
                });
                return;
            }

            //삭제 성공
            blogDB[blogIdx] = {};
            resolve({
                code:statusCode.OK,
                json:authUtil.successTrue(responseMessage.BOARD_DELETE_SUCCESS)
            });
        });
    }
};