const express = require('express')

const router = express.Router()


const { createElection, populateCandidates, registerForElection, getElection} = require('../controllers/election.controller')
router.route("/createElection").post(createElection)
router.route('/getElection').get(getElection)
router.route('/populateCandidate').put(populateCandidates)
router.route('/registerForElection').post(registerForElection)


module.exports = router