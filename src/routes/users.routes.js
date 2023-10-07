const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const checker = require('../middleware/checker')

// Create a new user
router.post('/create', usersController.createUser)
router.post('/login', usersController.login)
router.post('/slot', checker, usersController.slotsRegistration)

module.exports = router
