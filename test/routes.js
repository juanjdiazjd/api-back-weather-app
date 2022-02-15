/* eslint-disable no-unused-expressions */

var supertest = require('supertest-as-promised')(require('../app'));
var expect = require('chai').expect;
var functions = require("../models/functions")


describe('Testeando rutas de la api v1', function () {


  describe('/v1/location', function () {
    it('GET responde con los datos de la ubicacion segun ip-api', function () {

      return supertest
        .get('/v1/location')
        .expect(200)
        .set('x-forwarded-for', "45.207.243.10")
        .expect('Content-Type', /json/)
        .expect(function (res) {
          expect(res.body.regionName).to.eql("California");
        });
    });

  });

  describe('/v1/current', function () {
    it('POST responde con los datos del clima actual de Rusia.', function () {
      functions.getWeatherData("Rusia").then(response => {
        response = response[0].weatherData
        return supertest
          .post('/v1/current/')
          .body({ city: "Rusia" })
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(function (res) {
            expect(res.body[0].weatherData).to.eql(response);
          });
      });
    })

  });

});
