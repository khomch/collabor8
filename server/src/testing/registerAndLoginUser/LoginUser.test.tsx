import { Request } from "supertest";
import { assert} from "console";
import { startServer, app } from "../../index";
import request from "supertest";


describe("POST /user/login an error message is returned if user does not exist", () => {
    let res: any;

    beforeAll(async () => {
        res  = await request(app)
        .post("/user/login")
        .send({"emailAddress":"false@gmail.com",
        "password":"test"
       });
    });

    it("should return a status code 401", () => {
        expect(res.status).toBe(401);
    });

    it("should return a error message", () => {
        expect(res.body.errorMsg).toBe("User does not exist");
    });

});

describe("POST /user/login registered users using invalid credentials return an error message", () => {
    let res: any;

    beforeAll(async () => {
        res  = await request(app)
        .post("/user/login")
        .send({
            "emailAddress":"test@gmail.com",
            "password":"test",
        });
    });

    it("should return a status code 401", () => {
        expect(res.status).toBe(401);
    });

    it("should return a error message", () => {
        expect(res.body.errorMsg).toBe("Invalid credentials");
    });

});

describe("POST /user/login sucessful logged in message and token is returned if correct credentials are entered", () => {
    let res: any;

    beforeAll(async () => {
        res  = await request(app)
        .post("/user/login")
        .send({
            "emailAddress":"test@gmail.com",
            "password":"password123",
        });
    });

    it("should return a status code 401", () => {
        expect(res.status).toBe(200);
    });

    it("should return a error message", () => {
        expect(res.body.message).toBe("testuser logged in.");
    });

    it("should return a error message", () => {
        expect(res.body.token).toBeTruthy();
    });

});