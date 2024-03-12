const express = require('express')

const router = express.Router()

const { deploy, compile} = require("../controllers/terminal.controllers")


router.route('/deploy').get(deploy)
router.route('/compile').get(compile)


module.exports = router