const express = require('express')
const router = express.Router()

const { addNewCandidate, getAllCandidates, updateCandidateInfo, deleteAllCandidate, deleteCandidate, getCandidate } = require('../controllers/candidate.controller')


router.route('/addNewCandidate/:electionId').post(addNewCandidate)
router.route('/getAllCandidates').get(getAllCandidates)
router.route('/getCandidate/candidateId').get(getCandidate)
router.route('/updateCandidateInfo/:candidateId').put(updateCandidateInfo)
router.route('/deleteAllCandidate', deleteAllCandidate)
router.route('/deleteCandidate/:candidateId', deleteCandidate)



module.exports = router