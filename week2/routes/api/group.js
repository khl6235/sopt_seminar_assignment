const express = require('express');
const router = express.Router();
const csvManager = require('../../module/csvManager');
const groupMixer = require('../../module/groupMixer');

router.get('/', async (req, res) => {
    try {
        const groupArray = await csvManager.read('group.csv');
        console.log(groupArray);
        const groupMap = {};
        groupArray.forEach(element => {
            groupMap[element.groupIdx] = element.name;
        });
        const memberArray = await csvManager.read('member.csv');
        res.status(200).send(memberArray.map(it => `${it.name}:${groupMap[it.groupIdx]}`).join('\n'));
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/mixer', async (req, res) => {
    try{
        const memberArray = await csvManager.read('member.csv');
        const newArray = groupMixer.mix(memberArray);
        await csvManager.write('member.csv', newArray);
        res.status(200).send('success to mix group');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:groupIdx', async (req, res) => {
    const groupIdx = req.params.groupIdx;
    try {
        const groupArray = await csvManager.read('group.csv');
        console.log(groupArray);
        const groupMap = {};
        groupArray.forEach(element => {
            groupMap[element.groupIdx] = element.name;
        });
        const memberArray = await csvManager.read('member.csv');
        res.status(200).send(memberArray
            .filter(it => it.groupIdx == groupIdx)
            .map(it => `${it.name}:${groupMap[it.groupIdx]}`)
            .join('\n'));
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
