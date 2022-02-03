'use strict';

var express = require('express');
const publicIp = require('public-ip');
var router = express.Router();
var functions = require('../models/functions.js');
var bodyParser = require('body-parser');
var _ = require('lodash');


router.use(bodyParser.json());

router.get('/alive', (req, res) => {
    res.send("Alive!!")

});


router.get('/location', async (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (ip == '::1' || ip.includes("::")) { ip = await publicIp.v4() }

    functions.getDataCity(ip).then(body => {

        res.status(200).send(body)
    })

});

router.post('/current/', async (req, res) => {
    let city = req.body.city
    let lat = req.body.lat
    let lon = req.body.lon
    let data = {}
    if (!!city) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        if (ip == '::1' || ip.includes("::")) { ip = await publicIp.v4() }
        functions.getDataCity(ip).then(body => {
            functions.getWeatherData(body["city"]).then(response => {
                data["weatherData"] = response[0].weatherData
                data["locationData"] = body
                res.status(200).send(data)
            }).catch(error =>
                res.status(400).send("Hubo un error " + error.toString()))
        })
    } else {
        functions.getWeatherData(city, lat, lon).then(response => {
            res.status(200).send(response[0])
        }).catch(error =>
            res.status(400).send("Hubo un error " + error.toString()))
    }
})

router.post('/forecast/', async (req, res) => {
    let city = req.body.city
    let lat = req.body.lat
    let lon = req.body.lon
    let data = {}
    console.log("city in req: ", city)

    if (_.isEmpty(city)|| _.isNull(city)) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        if (ip == '::1' || ip.includes("::")) { ip = await publicIp.v4() }
        functions.getDataCity(ip).then(body => {
            functions.getForecastData(body["city"]).then(response => {
                data["forecast"] = response
                data["location"] = body
                res.status(200).send(data)
            }).catch(error =>
                res.status(400).send("Hubo un error " + error.toString()))

        })
    } else {
        functions.getForecastData(city, lat, lon).then(response => {
            data["forecast"] = response
            res.status(200).send(data)
        }).catch(error =>
            res.status(400).send("Hubo un error " + error.toString()))
    }
})

module.exports = router;
