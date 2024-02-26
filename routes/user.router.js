const express = require('express')

const router = express.Router()

const {signin, signup } = require('../controllers/user.auth')

router.route('/signup').post(signup)
router.route('/signin').post(signin)


module.exports = router