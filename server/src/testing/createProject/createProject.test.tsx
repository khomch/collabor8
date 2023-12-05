import { assert} from "console";
import { startServer, app } from "../../index";
import request from "supertest";


///to take out tech stack from create new project as its contained within openedRoles
///project workspace name and link not recalled when loaded
///manage team name and role is not recalled when loaded
///changes to manage team, add new role not workings
/// need to review the logic of the project workspaces and how they are updated.

describe("POST /project/create user is able to create a project sucessfully", () => {
    let res: any;
    let token: any;

    beforeAll(async () => {
        const resLogin = await request(app)
            .post("/user/login")
            .send({"emailAddress":"test@gmail.com", "password":"password123"});
    
        token = resLogin.body.token; 
    
        res = await request(app)     
            .post("/project/create")       
            .set('Authorization', `Bearer ${token}`) 
            .send({
                "title": "test project",
                "link": "www.test.com",
                "aboutProject": "This is a supertest project",
                "estimatedDeadline": "2024-12-31T00:00",
                "type": "New project",
                "description": "Super test project description",
                "additionalInfo": "Super test additional info",
                "level": "Junior level",
                "techstack": [],
                "openedRoles": [ { "role": 'full stack developer', "techstack": ["javascript"] } ], 
                "workspace": [{ "name": 'slack', "link": "www.slack.com" }],
                "appliedUsers": []                           
            })
                       
    });    

    it("should return a status code 201", () => {
        expect(res.status).toBe(201);        
    });    
    
    it("should return updated fields that were sent", () => {
         expect(res.body.title).toBe("test project");
         expect(res.body.link).toBe("www.test.com");
         expect(res.body.aboutProject).toBe("This is a supertest project");
         expect(res.body.estimatedDeadline).toBe("2024-12-31T00:00");
         expect(res.body.type).toBe("New project");
         expect(res.body.description).toBe("Super test project description");
         expect(res.body.additionalInfo).toBe("Super test additional info");       
         expect(res.body.projectWorkspaces[0].name).toBe("slack")  
         expect(res.body.projectWorkspaces[0].link).toBe("www.slack.com")  
        });
    
    it("should return opened roles and techstack", () => {
            expect(res.body.openedRoles[0].role).toBe("full stack developer");       
            expect(res.body.openedRoles[0].techstack[0]).toBe("javascript");
        });
   
});

describe("PUT /project/create user is able to create a project sucessfully", () => {
    let res: any;
    let token: any;

    beforeAll(async () => {
        const resLogin = await request(app)
            .post("/user/login")
            .send({"emailAddress":"test@gmail.com", "password":"password123"});
    
        token = resLogin.body.token; 
    
        res = await request(app)     
            .put("/project/edit")       
            .set('Authorization', `Bearer ${token}`) 
            .send({
                "projectOwnerId":"656d9ee6b08cac5718b44b7b",
                "_id":"656dfc95c8d229699c06bcb1",
                "title": "test project update",
                "link": "www.testupdate.com",
                "aboutProject": "This is a supertest project update test",
                "estimatedDeadline": "2025-12-31T00:00",
                "type": "New project update",
                "description": "Super test project description update",
                "additionalInfo": "Super test additional info update",
                "level": "Junior level",
                "techstack": [],
                "openedRoles": [ { "role": 'full stack developer', "techstack": ["javascript"] },{ "role":'back-end developer',"techstack": ["python"] } ], 
                "workspace": [{ "name": 'slackupdate', "link": "www.slackupdate.com" }],
                "appliedUsers": []                           
            })
                       
    });    

    it("should return a status code 200", () => {
        expect(res.status).toBe(200);
        
    });    
    
    it("should return updated fields that were sent", () => {
         expect(res.body.title).toBe("test project update");
         expect(res.body.link).toBe("www.testupdate.com");
         expect(res.body.aboutProject).toBe("This is a supertest project update test");
         expect(res.body.estimatedDeadline).toBe("2025-12-31T00:00");
         expect(res.body.type).toBe("New project update");
         expect(res.body.description).toBe("Super test project description update");
         expect(res.body.additionalInfo).toBe("Super test additional info update");       
         expect(res.body.projectWorkspaces[0].name).toBe("slackupdate")  
         expect(res.body.projectWorkspaces[0].link).toBe("www.slackupdate.com")  
        });
    
    it("should return opened roles and techstack", () => {
            expect(res.body.openedRoles[1].role).toBe("back-end developer");       
            expect(res.body.openedRoles[1].techstack[0]).toBe("python");
        });
   
});

describe("GET /project/:id created projects are successfully recalled", () => {
    let res: any;
    let token: any;
    let projectId: string;

    beforeAll(async () => {
        const resLogin = await request(app)
            .post("/user/login")
            .send({"emailAddress":"test@gmail.com", "password":"password123"});
    
        token = resLogin.body.token; 
        res = await request(app)     
        .post("/project/create")       
        .set('Authorization', `Bearer ${token}`) 
        .send({
            "title": "test project3",
            "link": "www.test.com",
            "aboutProject": "This is a supertest project",
            "estimatedDeadline": "2024-12-31T00:00",
            "type": "New project",
            "description": "Super test project description",
            "additionalInfo": "Super test additional info",
            "level": "Junior level",
            "techstack": [],
            "openedRoles": [ { "role": 'full stack developer', "techstack": ["javascript"] } ], 
            "workspace": [{ "name": 'slack', "link": "www.slack.com" }],
            "appliedUsers": []                           
        })
        projectId = res.body._id
    });
    
    describe("GET /project/:id", () => {
        let getRes: any;

        beforeAll(async () => {
            getRes = await request(app)
                .get(`/project/${projectId}`)
                .set('Authorization', `Bearer ${token}`);
        });

        it("should return a status code 200", () => {
            expect(getRes.status).toBe(200);
        });

        it("should return the created project", () => {
            expect(getRes.body._id).toBe(projectId);
            expect(getRes.body.title).toBe("test project3");
        });
    });
});


//to come back to this later with a merge

// describe("POST and PUT /project user is able to create and update a project successfully", () => {
//     let postRes: any;
//     let putRes: any;
//     let token: any;

//     beforeAll(async () => {
//         const resLogin = await request(app)
//             .post("/user/login")
//             .send({"emailAddress":"test@gmail.com", "password":"password123"});
    
//         token = resLogin.body.token; 
    
//         postRes = await request(app)     
//             .post("/project/create")       
//             .set('Authorization', `Bearer ${token}`) 
//             .send({
//                 "title": "test project",
//                 "link": "www.test.com",
//                 "aboutProject": "This is a supertest project",
//                 "estimatedDeadline": "2024-12-31T00:00",
//                 "type": "New project",
//                 "description": "Super test project description",
//                 "additionalInfo": "Super test additional info",
//                 "level": "Junior level",
//                 "techstack": [],
//                 "openedRoles": [ { "role": 'full stack developer', "techstack": ["javascript"] } ], 
//                 "workspace": [{ "name": 'slack', "link": "www.slack.com" }],
//                 "appliedUsers": []                           
//             })
                       
//     });    

//     beforeAll(async () => {
//         putRes = await request(app)     
//             .put("/project/edit")       
//             .set('Authorization', `Bearer ${token}`) 
//             .send({
//                 "projectOwnerId":postRes.projectOwnerId,
//                 "_id":postRes._id,
//                 "title": "test project update",
//                 "link": "www.testupdate.com",
//                 "aboutProject": "This is a supertest project update test",
//                 "estimatedDeadline": "2025-12-31T00:00",
//                 "type": "New project update",
//                 "description": "Super test project description update",
//                 "additionalInfo": "Super test additional info update",
//                 "level": "Junior level",
//                 "techstack": [],
//                 "openedRoles": [ { "role": 'full stack developer', "techstack": ["javascript"] },{ "role":'back-end developer',"techstack": ["python"] } ], 
//                 "workspace": [{ "name": 'slackupdate', "link": "www.slackupdate.com" }],
//                 "appliedUsers": []                           
//             })
//     });    

//     // ... your tests for the POST request here, using postRes
//     it("should return a status code 200", () => {
//         expect(postRes.status).toBe(200);
        
//     });    
    
//     it("should return updated fields that were sent", () => {
//          expect(postRes.body.title).toBe("test project update");
//          expect(postRes.body.link).toBe("www.testupdate.com");
//          expect(postRes.body.aboutProject).toBe("This is a supertest project update test");
//          expect(postRes.body.estimatedDeadline).toBe("2025-12-31T00:00");
//          expect(postRes.body.type).toBe("New project update");
//          expect(postRes.body.description).toBe("Super test project description update");
//          expect(postRes.body.additionalInfo).toBe("Super test additional info update");       
//          expect(postRes.body.projectWorkspaces[0].name).toBe("slackupdate")  
//          expect(postRes.body.projectWorkspaces[0].link).toBe("www.slackupdate.com")  
//         });
    
//     it("should return opened roles and techstack", () => {
//             expect(postRes.body.openedRoles[1].role).toBe("back-end developer");       
//             expect(postRes.body.openedRoles[1].techstack[0]).toBe("python");
//         });
//     // ... your tests for the PUT request here, using putRes

//     it("should return a status code 200", () => {
//         expect(putRes.status).toBe(200);
        
//     });    
    
//     it("should return updated fields that were sent", () => {
//          expect(putRes.body.title).toBe("test project update");
//          expect(putRes.body.link).toBe("www.testupdate.com");
//          expect(putRes.body.aboutProject).toBe("This is a supertest project update test");
//          expect(putRes.body.estimatedDeadline).toBe("2025-12-31T00:00");
//          expect(putRes.body.type).toBe("New project update");
//          expect(putRes.body.description).toBe("Super test project description update");
//          expect(putRes.body.additionalInfo).toBe("Super test additional info update");       
//          expect(putRes.body.projectWorkspaces[0].name).toBe("slackupdate")  
//          expect(putRes.body.projectWorkspaces[0].link).toBe("www.slackupdate.com")  
//         });
    
//     it("should return opened roles and techstack", () => {
//             expect(putRes.body.openedRoles[1].role).toBe("back-end developer");       
//             expect(putRes.body.openedRoles[1].techstack[0]).toBe("python");
//         });
// });