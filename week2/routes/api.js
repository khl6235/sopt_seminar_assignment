var express = require('express');
var router = express.Router();
const csv = require('csvtojson');

/* GET home page. */
router.get('/group', function(req, res, next) {
    csv().fromFile('./public/csvs/member.csv').then((jsonArr) => {
        if (!jsonArr) {
            console.log(`file read err: ${err}`);
            return;
        }
        var res_data = []
        jsonArr.forEach(function(elem) {
            res_data.push(elem['name'])
        })
        res.send(`${res_data}`);
    }, (err) => {
        console.log(`err with readCSV: ${err}`);
    })
});

router.get('/group/:groupIdx', function(req, res, next) {
    let idx = req.params.groupIdx

    csv().fromFile('./public/csvs/group.csv').then((jsonArr) => {
        if (!jsonArr) {
            console.log(`file read err: ${err}`);
            return;
        }
        csv().fromFile('./public/csvs/member.csv').then((groupArr) => {
            if (!groupArr) {
                console.log(`file read err: ${err}`);
                return;
            }
            res_data = []
            groupArr.forEach(function(elem) {
                if(elem['groupIdx'] == idx) {
                    res_data.push(elem['name']);
                }
            })
            jsonArr.forEach(function(elem){
                if(elem['groupIdx'] == idx){
                    res.send(`${elem['name']} : ${res_data}`);
                }
            })
        
        }, (err) => {
            console.log(`err with readCSV: ${err}`);
        })
    }, (err) => {
        console.log(`err with readCSV: ${err}`);
    })
});
  
module.exports = router;