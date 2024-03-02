const express = require('express')

const router = express.Router()

const { signup, signin, deleteAllOrganizations, getAllOrganizations, updateOrganization} = require('../controllers/organization.auth.controller')


router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/getAllOrganizations').get(getAllOrganizations)
router.route('/updateOrganization/:organizationId').put(updateOrganization)
router.route('/deleteAllOrganizations').delete(deleteAllOrganizations)

module.exports = router