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
// updateProject
router.put('/projects/edit/:pid',jwtMiddleware,multerConfig.single("projectImg"),projectController.editUserProject)
 // deleteProject
 router.delete('/projects/delete/:pid',jwtMiddleware,projectController.deleteProject)

//  updateprofile
router.put('/updateprofile',jwtMiddleware,multerConfig.single("profileImg"),userController.updateProfile)
// get profile
router.get('/getprofile',jwtMiddleware,userController.getProfile)
module.exports=router