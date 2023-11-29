import { Router } from 'express';
import userCtrl from './controllers/user';
import userDetails from './controllers/userDetails';
import projectDetails from './controllers/projectDetails';
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
import { authenticateToken } from './middlewares/auth';

// TODO authentication
///to update for middleware routes

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "collabor8 API",
      version: "1.0.0",
    },
  },
  apis: ["**/*.ts"],
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
router.post("/user/register", userCtrl.register);

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
router.post("/user/login", userCtrl.login);

//user details

/**
 * @swagger
 *  /user/details:
 *    post:
 *      tags:
 *      - user
 *      description: find and update user
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: userName
 *          required: true
 *          schema:
 *            type: string
 *            description: user name
 *      responses:
 *       200:
 *        description: success
 *       404:
 *        description: user not found
 */
router.post("/user/details", userDetails.userInfomation);

/**
 * @swagger
 *  /user/profiledetails:
 *    get:
 *      tags:
 *      - user
 *      description: user profile detail
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: emailAddress
 *          required: true
 *          schema:
 *            type: string
 *            description: email address
 *      responses:
 *       201:
 *        description: success
 *       400:
 *        description: user not found
 */
router.post("/user/profiledetails", userDetails.userProfile);

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
router.post("/project/create", projectDetails.createProject);
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
router.put("/project/edit", projectDetails.editProjectDetails);
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
router.get("/project/:id", projectDetails.getProjectDetails);
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
router.get("/projects", projectDetails.getAllProjectDetails);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// router.get("/api-docs", swaggerUi.setup(swaggerDocument));

export default router;