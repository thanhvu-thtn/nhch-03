const monHocRouter = require('express').Router()
const monHocController = require('../controllers/monhocController')
const { verifyTokenAndAdmin } = require('../controllers/verifyToken')

//index
monHocRouter.get('/index', verifyTokenAndAdmin, monHocController.GetAll)
//addnew
monHocRouter.post('/addnew', monHocController.AddNew)
//delete
monHocRouter.post('/delete', monHocController.DeleteMonHoc)
//Update
monHocRouter.post('/update', monHocController.UpdateMonHoc)
module.exports = monHocRouter
