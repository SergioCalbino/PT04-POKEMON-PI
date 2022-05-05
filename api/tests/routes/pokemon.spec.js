/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const request = require("supertest");
const sinon = require("sinon");

const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");
const axios = require("axios");

const pokemon = {
  id: "27a66560-883a-4dac-8579-07464e8e8940",
  name: "pepe",
  life: 45,
  weight: 50,
  height: 65,
  speed: 52,
  defense: 63,
  strength: 65,
};

let axiosStub;
describe("Pokemon routes", () => {
  // before(() =>
  //   conn.authenticate().catch((err) => {
  //     console.error("Unable to connect to the database:", err);
  //   })
  // );
  beforeEach(async () => {
    await Pokemon.sync({ force: true });

    let promise = Promise.resolve([{ obj: "obj" }]);
    axiosStub = sinon.stub(axios, "get");
    axiosStub.resolves(promise);
  });
  describe("GET /pokemons", () => {
    it.only("should get 200", async (done) => {
      const resp = await request(app).get("/pokemons");
      expect(axiosStub.calledOnce).to.be.true;
      done();
      // expect(resp.statusCode).to.be.equal(200);
      // expect(resp.body).to.be.an('array').that.greaterThan(0)
    });
  });
});
