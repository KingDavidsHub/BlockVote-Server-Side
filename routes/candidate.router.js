const express = require('express')
const router = express.Router()

const { addNewCandidate, getAllCandidates, updateCandidateInfo } = require('../controllers/candidate.controller')


router.route('/addNewCandidate').post(addNewCandidate)
router.route('/getAllCandidates').get(getAllCandidates)
router.route('/updateCandidateInfo/:candidateId').put(updateCandidateInfo)



module.exports = router