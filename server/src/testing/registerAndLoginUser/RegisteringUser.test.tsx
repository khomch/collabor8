import { Request } from "supertest";
import { assert} from "console";
import { startServer, app } from "../../index";
import request from "supertest";


///type npx jest RegisteringUser.test.tsx

describe("POST /user/register A new user is registered if they do not exist", () => {
    let res: any;

    beforeAll(async () => {
        res  = await request(app)
        .post("/user/register")
        .send({
            "emailAddress":"test@gmail.com",
            "userName":"testuser",
            "password":"password123",
            "firstName":"test-firstname",
            "lastName":"test-lastname"
        });
    });

    it("should return a status code 201", () => {
        expect(res.status).toBe(201);
    });

    it("should return a success message", () => {
        expect(res.body.message).toBe("testuser succesfully registered.");
    });

    it("should have a truthy message", () => {
        expect(res.body.message).toBeTruthy();
    });


});


describe("POST /user/register Once new user is registered they cannot re-register as they exist", () => {
    let res: any;

    beforeAll(async () => {
        res  = await request(app)
        .post("/user/register")
        .send({
            "emailAddress":"test@gmail.com",
            "userName":"testuser",
            "password":"password123",
            "firstName":"test-firstname",
            "lastName":"test-lastname"
        });
    });

    it("should return a status code 409", () => {
        expect(res.status).toBe(409);
    });

    it("should return a success message", () => {
        expect(res.body.errorMsg).toBe("User already exists");
    });

});