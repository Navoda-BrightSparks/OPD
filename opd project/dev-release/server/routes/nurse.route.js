const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const PatientModel = mongoose.model('Patient'),
    visitModel = mongoose.model('Visit');

const Router = express.Router();


Router.post('/register', (req, res) => {
    var patient = new PatientModel(req.body);
    patient.save().then(patient => {
        console.log(patient.HIN);
        res.json(patient);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});


module.exports = Router;