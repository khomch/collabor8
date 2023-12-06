import request from "supertest";
import { app } from "../../index";

///Create a new user to peform these test endpoint
/// created the user {"emailAddress":"newtestuser@gmail.com","password":"123"}

describe("POST /project/apply user is able to apply for a project sucessfully", () => {
    let res: any;
    let token: any;

    beforeAll(async () => {
        const resLogin = await request(app)
            .post("/user/login")
            .send({"emailAddress":"newtestuser@gmail.com", "password":"123"});
    
        token = resLogin.body.token; 
    
        res = await request(app)     
            .post("/project/apply")       
            .set('Authorization', `Bearer ${token}`) 
            .send({
                "projectId": "656e0be00ddd4f803159b8a4",
                "username": "newtestuser",
                "role": "Not specified",
                "company": 'Not specified'
              })
             
    });    

    it("should return a status code 201 if user has not applied", () => {
        expect(res.status).toBe(201);        
    });    
    
    it("should return applied users username for applied user", () => {
         expect(res.body.appliedUsers[0].username).toBe("newtestuser");
        });    
      
});

describe("POST /project/apply user applied message is returned if they have already applied and not been approved", () => {
    let res: any;
    let token: any;

    beforeAll(async () => {
        const resLogin = await request(app)
            .post("/user/login")
            .send({"emailAddress":"newtestuser@gmail.com", "password":"123"});
    
        token = resLogin.body.token; 
    
        res = await request(app)     
            .post("/project/apply")       
            .set('Authorization', `Bearer ${token}`) 
            .send({
                "projectId": "656e0be00ddd4f803159b8a4",
                "username": "newtestuser",
                "role": "Not specified",
                "company": 'Not specified'
              })
             
    });    

    it("should return a status code 409 if user has already applied", () => {
        expect(res.status).toBe(409);        
    });    
    
    it("should return applied users username for applied user", () => {
         expect(res.body.message).toBe("User already applied");
        });    
      
});






// router.post('/project/deny', authenticateToken, projectDetails.denyUser);
// router.post('/project/finish', authenticateToken, projectDetails.finishUserTask);
// router.post('/project/review', authenticateToken, projectDetails.reviewUser);
// router.get('/project-owner', authenticateToken, projectDetails.getProjectOwner);