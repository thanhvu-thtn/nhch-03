const authRouter = require('express').Router()
const authController = require('../controllers/authController')

//login
authRouter.post('/login', authController.loginUser)
//refresh token
authRouter.post('/refresh', authController.requestRefreshToken)

module.exports = authRouter
