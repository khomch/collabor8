import { Router } from 'express';
import userCtrl from './controllers/user';
// import { authMiddleware } from './middlewares/auth';

const router = Router();

router.post('/user/register', userCtrl.register);
// router.post('/user/login', userCtrl.login);
// router.post('/user/logout', authMiddleware , userCtrl.logout);
