import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import config from "../../config.js";
import { initMongoDB } from "../persistence/daos/mongodb/conexion.js";


await initMongoDB();
const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

describe("Testing User/Session Router", async () => {
  beforeEach(async function () {
    
  });

  it("Obtener un usuario por su email", async () => {
    let credentialsMock = {
      email: "carrio@mail.com",
      password: "1234",
    };
    const { statusCode, body, headers } = await requester
      .post("users/login")
      .send(credentialsMock);

    expect(statusCode).to.be.eql(200);
    expect(typeof body, "object").to.be.ok;
    expect(body.status).to.be.eql("success");
  });

  it("Obtener un error enviando usuario invalido", async () => {
    let credentialsMock = {
      email: "ernesto@gmail.com",
      password: "123456",
    };
    const { statusCode, body } = await requester
      .post("users/login")
      .send(credentialsMock);
    expect(statusCode).to.be.eql(401);
    expect(body.status).to.be.eql("error");
    expect(body.error).to.be.eql("User not found");
  });
});
