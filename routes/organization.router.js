const express = require('express')

const router = express.Router()

const { signup} = require('../controllers/organization.controller')


router.route('/signup').post(signup)


module.exports = router