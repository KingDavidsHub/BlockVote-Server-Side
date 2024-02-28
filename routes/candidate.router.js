const express = require('express')
const router = express.Router()

const { addNewCandidate, getAllCandidates } = require('../controllers/candidate.controller')


router.route('/addNewCandidate').post(addNewCandidate)
router.route('/getAllCandidates').get(getAllCandidates)


module.exports = router