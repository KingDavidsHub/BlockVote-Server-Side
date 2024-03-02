const express = require('express')

const router = express.Router()

const {signin, signup, getTokenByEmail, verifyUser , getAllUsers } = require('../controllers/user.auth.controller')

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/getTokenByEmail').get(getTokenByEmail)
router.route('/verifyUser').post(verifyUser)
router.route("/getAllUsers").get(getAllUsers)

module.exports = router