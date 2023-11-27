import { Router } from 'express';
import userCtrl from './controllers/user';
import userDetails from './controllers/userDetails';
import projectDetails from './controllers/projectDetails';
// TODO authentication
// import { authMiddleware } from './middlewares/auth';
///to update for middleware routes

const router = Router();

//register and login routes

router.post('/user/register', userCtrl.register);
router.post('/user/login', userCtrl.login);

//user details

router.post('/user/details',userDetails.userInfomation)
router.get('/user/profiledetails',userDetails.userProfile)

//project details

router.post('/user/createproject',projectDetails.CreateProject)
router.post('/user/editprojectdetails',projectDetails.EditProjectDetails)
router.get('/user/projectdetails',projectDetails.GetProjectDetails)
router.get('/allprojects',projectDetails.GetAllProjectDetails)

export default router;