import { Request } from "supertest";
import { assert} from "console";
import { startServer, app } from "../../index";
import request from "supertest";


describe("GET /user/profile user profile is returned", () => {
    let res: any;
    let token: any;

    beforeAll(async () => {
        const resLogin = await request(app)
            .post("/user/login")
            .send({"emailAddress":"test@gmail.com", "password":"password123"});
    
        token = resLogin.body.token; 
    
        res = await request(app)
            .get("/user/profile")
            .set('Authorization', `Bearer ${token}`); 
    });

    it("should return a status code 200", () => {
        expect(res.status).toBe(200);
    });

    it("should return a _id of 656d9ee6b08cac5718b44b7b", () => {
        expect(res.body._id).toBe("656d9ee6b08cac5718b44b7b");
    });

});

describe("PUT /user/profile user profile details are correctly updated when a put request is sent", () => {
    let res: any;
    let token: any;

    beforeAll(async () => {
        const resLogin = await request(app)
            .post("/user/login")
            .send({"emailAddress":"test@gmail.com", "password":"password123"});
    
        token = resLogin.body.token; 
    
        res = await request(app)     
            .put("/user/profile")       
            .set('Authorization', `Bearer ${token}`) 
            .send({
                "userName":"testuser",
                "emailAddress":"test@gmail.com",
                "firstName":"test-firstname",
                "lastName":"test-lastname",
                "website":"www.supertest.com",
                "company":"collabor8",
                "github":"www.github.com/profile/test",
                "role":"developer",
                "bio":"test",
                "profile":{
                    "technologyStack":[],
                    "links":[],
                    "references":[],
                    "projects":[]
                }            
            })
                                   
    });    

    it("should return a status code 200", () => {
        expect(res.status).toBe(200);
        
    });

    it("should return updated fields that were sent", () => {
        expect(res.body.website).toBe("www.supertest.com");
        expect(res.body.company).toBe("collabor8");
        expect(res.body.github).toBe("www.github.com/profile/test");
        expect(res.body.role).toBe("developer");
        expect(res.body.bio).toBe("test");
    });

});
