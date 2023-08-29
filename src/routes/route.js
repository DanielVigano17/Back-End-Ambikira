const routes = require('express').Router()

const CustumersController = require('../controllers/controller')


routes.get('/users', CustumersController.users)
routes.post('/users', CustumersController.createUser)
routes.post('/verify', CustumersController.verifyUser)


module.exports = routes