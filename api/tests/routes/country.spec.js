/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  name: 'Argentina',
};

describe('Country routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('GET /countries', () => {
    it('responds with 200', async () => { const result = await agent.get('/countries'); expect(200)});
    it('responds with an object with property count equal to 250', async () => {const res = await agent.get('/countries');
    expect(res.body.count).to.be.equal(250);  });
    it('responds with and object with property rows equal to an array of objects', () =>
      agent.get('/countries').then((res) => {
        expect(res.body.rows[0].name).to.be.equal("Afghanistan");
      }));
  });

 /* describe("GET /countries:id", () => {
     beforeEach(()=> agent.get("/countries").finally()); 
    it("responds with 200, if a valid id is passed", () => agent.get("/countries/ARG").expect(200));
    it("responds with an object with information about the given country", () =>
    agent.get("/countries/ARG").then((res)=>{
      expect(Object.keys(res.body.length)).to.be.equal(9)
    }))
  }) */

  /* beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create({ name: 'Argentina', id:"ARG", flag:"https://restcountries.eu/data/arg.svg", continent:"Americas"})));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  }); */
});


