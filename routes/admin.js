var express = require('express');
var router = express.Router();
var userEntry = require('../controller/adminControl');

router.post('/signup', userEntry.adminReg);

router.post('/login', userEntry.adminLogin);

router.get('/all', userEntry.adminShow)

module.exports = router;
