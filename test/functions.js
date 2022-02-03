/* eslint-disable no-unused-expressions */

var expect = require('chai').expect;
var functions = require("../models/functions")

describe('Probando funciones', async () =>{
  describe('getWeatherData', async () =>{
    it('Devuelve el tiempo actual y los datos de la ubicacion Santiago de Chile', async () => {
      result = await functions.getWeatherData("Santiago de Chile, Chile");
      console.log("RESULT TEST: ", result)
      expect(result[0].location.city).to.equal("Santiago");
    });

  });

});
