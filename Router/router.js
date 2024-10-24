const express=require('express')
const router=express.Router()
const userController=require('../Controller/userController')
const projectController=require('../Controller/projectController')
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const multerConfig = require('../middlewares/multerMiddleware')

// register
router.post('/register',userController.register)
// login
router.post('/login',userController.login)
// addProject
router.post('/addProject',jwtMiddleware,multerConfig.single('projectImg'),projectController.addProjects)
// getHomeProjects
router.get('/homeProjects',projectController.getHomeProjects)
// getUserProjects
router.get('/userProjects',jwtMiddleware,projectController.getUserProjects)
// getAllProjects
router.get('/allProjects',jwtMiddleware,projectController.getAllProjects)

module.exports=router