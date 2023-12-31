import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";
import config from "../../config.js";

mongoose.connect(config.MONGO_URL);

const expect = chai.expect;
const requester = supertest("http://localhost:8080/");

describe("Testing Cart Router", () => {
  let cookie;
  beforeEach(function () {
    this.timeout(10000);
  });
  it("Obtener cookie para autenticacion", async () => {
    let credentialsMock = {
      email: "carrio@mail.com",
      password: "1234",
    };
    const result = await requester
      .post("users/login")
      .send(credentialsMock);
    const cookieResult = result.headers["set-cookie"][0];

    expect(cookieResult).to.be.ok;

    const cookieResultSplit = cookieResult.split("=");
    cookie = {
      name: cookieResultSplit[0],
      value: cookieResultSplit[1],
    };

    expect(cookie.name).to.be.ok.and.equal("tokenBE");
    expect(cookie.value).to.be.ok;
  });
  it("Crear un nuevo carrito", async () => {
    const { statusCode, body } = await requester
      .post("carts/")
      .set("Cookie", `${cookie.name}=${cookie.value}`);

    expect(statusCode).to.be.eql(200);
    expect(typeof body, "object").to.be.ok;
    expect(body.status).to.be.eql("success");
    expect(body.payload).to.have.property("_id");
    expect(body.payload.products).to.have.length(0);
  });
});
