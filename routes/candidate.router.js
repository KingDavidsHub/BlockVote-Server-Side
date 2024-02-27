const express = require('express')
const router = express.Router()

const { addNewCandidate } = require('../controllers/candidate.controller')


router.route('/addNewCandidate').post(addNewCandidate)


module.exports = router