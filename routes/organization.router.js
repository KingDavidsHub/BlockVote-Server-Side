const express = require('express')

const router = express.Router()

const { signup, signin, deleteAllOrganizations} = require('../controllers/organization.controller')


router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/deleteAllOrganizations').delete(deleteAllOrganizations)

module.exports = router