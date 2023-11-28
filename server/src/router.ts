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
router.post('/user/profiledetails',userDetails.userProfile)

//project details

router.post('/project/create',projectDetails.createProject)
router.put('/project/edit',projectDetails.editProjectDetails)
router.get('/project/:id',projectDetails.getProjectDetails)
router.get('/projects',projectDetails.getAllProjectDetails)

export default router;