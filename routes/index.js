'use strict';

var express = require('express');
const publicIp = require('public-ip');
var router = express.Router();
var functions = require('../models/functions.js');
var bodyParser = require('body-parser');


router.use(bodyParser.json());

router.get('/alive', (req, res) =>{
    
    res.send("Alive!!")

});


router.get('/location', async (req, res) =>{
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if(ip == '::1' || ip.includes("::")){ip =  await publicIp.v4()}
   
functions.getDataCity(ip).then(body=>{
    
    res.status(200).send(body)
})

});

router.get('/current/:city?',async(req,res)=>{
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if(ip == '::1' || ip.includes("::")){ip =  await publicIp.v4()}
   
    let city = req.params.city
    let data = {}
    if(!city){
        functions.getDataCity(ip).then(body=>{
            functions.getWeatherData(body["city"]).then(response=>{

                data["weatherData"] = response[0].weatherData
                data["locationData"] = body
                res.status(200).send(data)
            })
       
        })
    }else{
        functions.getWeatherData(city).then(response=>{
            res.status(200).send(response[0])
        })
        
    }
    
})

router.get('/forecast/:city?',async(req,res)=>{
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if(ip == '::1' || ip.includes("::")){ip =  await publicIp.v4()}
   
    let city = req.params.city
    let data = {}
    if(!city){
        functions.getDataCity(ip).then(body=>{
            functions.getForecastData(body["city"]).then(response=>{

                data["forecastData"] = response
                data["locationData"] = body
                res.status(200).send(data)
            })
       
        })
    }else{
        functions.getForecastData(city).then(response=>{
            data["forecastData"]= response
            res.status(200).send(data)
        })
        
    }
    
})



module.exports = router;
