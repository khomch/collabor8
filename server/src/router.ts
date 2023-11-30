import { Router } from 'express';
import userCtrl from './controllers/user';
import userDetails from './controllers/userDetails';
import projectDetails from './controllers/projectDetails';
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
import { authenticateToken } from './middlewares/auth';
import review from './controllers/review';

// TODO authentication
///to update for middleware routes

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'collabor8 API',
      version: '1.0.0',
    },
  },
  apis: ['**/*.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

const router = Router();

//register and login routes
/**
 * @swagger
 *  /user/register:
 *    post:
 *      tags:
 *      - user
 *      description: register user
 *      produces:
 *      - application/json
 *      responses:
 *       401:
 *        description: Invalid credentials
 *       200:
 *        description: Success
 *       500:
 *        description: An error occurred while logging in
 */
router.post('/user/register', userCtrl.register);

/**
 * @swagger
 *  /user/login:
 *    post:
 *      tags:
 *      - user
 *      description: login user
 *      produces:
 *      - application/json
 *      responses:
 *       401:
 *        description: Invalid credentials
 *       200:
 *        description: Success
 *       500:
 *        description: An error occurred while logging in
 */
router.post('/user/login', userCtrl.login);

//user details

/**
 * @swagger
 *  /user/profile:
 *    post:
 *      tags:
 *      - user
 *      description: Find and update user
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: user
 *          description: User object to be updated
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              userName:
 *                type: string
 *              emailAddress:
 *                type: string
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              website:
 *                type: string
 *              company:
 *                type: string
 *              github:
 *                type: string
 *              profile:
 *                type: string
 *              role:
 *                type: string
 *      responses:
 *       200:
 *        description: Success
 *       404:
 *        description: User not found
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              message: User not found
 */
router.put('/user/profile', authenticateToken, userDetails.updateUserProfile);

/**
 * @swagger
 *  /user/profile:
 *    get:
 *      tags:
 *      - user
 *      description: user profile detail
 *      produces:
 *      - application/json
 *      responses:
 *       201:
 *        description: success
 *       400:
 *        description: user not found
 */

router.get('/user/profile', authenticateToken, userDetails.getUserProfile);

/**
 * @swagger
 *  /user/review:
 *    post:
 *      tags:
 *      - user
 *      description: write review to user
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: review
 *          description: Review object to be updated
 *          required: true
 *          schema:
 *            type: object
 *            properties:
 *              fromUserName:
 *                type: string
 *              rating:
 *                type: number
 *              feedback:
 *                type: string
 *      responses:
 *       201:
 *        description: Success
 *       404:
 *        description: Wrong path
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              message: User not found
 */
router.post('/user/review', authenticateToken, review.writeReview);

//project details

/**
 * @swagger
 *  /project/create:
 *    post:
 *      tags:
 *      - project
 *      description: create project (add another params)
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: projectOwnerId
 *          required: true
 *          schema:
 *            type: string
 *            description: add another params
 *      responses:
 *       201:
 *        description: success
 *       400:
 *        description: error
 */
router.post('/project/create', authenticateToken, projectDetails.createProject);
/**
 * @swagger
 *  /project/role:
 *    post:
 *      tags:
 *      - project
 *      description: add role to the project
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: projectOwnerId
 *          required: true
 *          schema:
 *            type: string
 *            description: add another params
 *      responses:
 *       201:
 *        description: success
 *       400:
 *        description: error
 */
router.post('/project/role', authenticateToken, projectDetails.addRole);
/**
 * @swagger
 *  /project/role:
 *    delete:
 *      tags:
 *      - project
 *      description: delete role fromthe project
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: projectOwnerId
 *          required: true
 *          schema:
 *            type: string
 *            description: add another params
 *      responses:
 *       200:
 *        description: success
 *       400:
 *        description: error
 */
router.delete('/project/role', authenticateToken, projectDetails.removeRole);
/**
 * @swagger
 *  /project/create:
 *    put:
 *      tags:
 *      - project
 *      description: edit project (add another params)
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: projectOwnerId
 *          required: true
 *          schema:
 *            type: string
 *            description: add another params
 *      responses:
 *       201:
 *        description: success
 *       404:
 *        description: user not found
 */
router.put(
  '/project/edit',
  authenticateToken,
  projectDetails.editProjectDetails
);
/**
 * @swagger
 *  /project/:id:
 *    get:
 *      tags:
 *      - project
 *      description: get project details (add another params)
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: projectOwnerId
 *          required: true
 *          schema:
 *            type: string
 *            description: add another params
 *      responses:
 *       201:
 *        description: success
 *       404:
 *        description: user not found
 */
router.get('/project/:id', projectDetails.getProjectDetails);
/**
 * @swagger
 *  /projects:
 *    get:
 *      tags:
 *      - project
 *      description: get all projects (add another params)
 *      produces:
 *      - application/json
 *      responses:
 *       201:
 *        description: success
 *       404:
 *        description: user not found
 */
router.get('/projects', projectDetails.getAllProjectDetails);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// router.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default router;
