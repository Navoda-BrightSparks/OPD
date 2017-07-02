/**
 * Created by greshan on 5/9/2017.
 */
'use strict';

const express = require('express'),
    mongoose = require('mongoose');

mongoose.set('debug', false);

const PatientModel = mongoose.model('Patient'),
    visitModel = mongoose.model('Visit'),
    AlergyModel=mongoose.model('Alergy');

const Router = express.Router();
//-----------DASHBOARD-----------------
Router.get('/', (req, res) => {
    if (req.query.info) {
        PatientModel.findOne({HIN: req.query.info}).populate('Alergies').populate('visits').exec().then(patient => {
            res.json(patient || {});
        }).catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
    }else if(req.query.bp){
        const aggregatorOpts = [{$match:{HIN:req.query.bp}},{$lookup:{
            from: "visits",
            localField: "visits",
            foreignField: "_id",
            as: "visits"
        }},{ $unwind: { path: "$visits" }},{$group:{
            _id:"$HIN",
            dataProvider:{$push:{ date:{$dateToString: { format: "%Y-%m-%d", date: "$visits.date" }},dBP: "$visits.examination.dBP", sBP: "$visits.examination.sBP",temp:"$visits.examination.temperature" }}

        }}];
        // get current results
        PatientModel.aggregate(aggregatorOpts).then(nodes=>{
            res.json(nodes);
        }).catch(err=>{res.send(err);});
    }else if(req.query.preVisit){
        const aggregatorOpts = [{$match:{HIN:req.query.preVisit}},{$lookup:{
            from: "visits",
            localField: "visits",
            foreignField: "_id",
            as: "visits"
        }},{$unwind:"$visits"},{$project:{visit:"$visits"}},{$sort:{"visit.date":-1}},{$limit:1}];
        PatientModel.aggregate(aggregatorOpts).then(visit=>{
            res.json(visit);
        }).catch(err=>{res.send(err);});
    }
       /* */
        // get current results

});
//-----------------------------------------
module.exports = Router;