'use strict';

 const express = require('express'),
     mongoose = require('mongoose');

 mongoose.set('debug', false);

 const PatientModel = mongoose.model('Patient'),
     visitModel = mongoose.model('Visit'),
     AlergyModel=mongoose.model('Alergy'),
     QuestinnaireModel=mongoose.model('questionnaire');


 const Router = express.Router();
//patients
 Router.get('/', (req, res) => {
     if(req.query.hin){
         PatientModel.find({HIN:req.query.hin}).populate('Alergies').populate('visits').exec().then(patient => {
             res.json(patient || {});
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });
     }
   else  if(req.query.nic){
         PatientModel.find({NIC:req.query.nic}).populate('Alergies').populate('visits').exec().then(patient => {
             res.json(patient || {});
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });

     } else  if(req.query.visitid){
         visitModel.findById(req.query.visitid).exec().then(visit => {
             res.json(visit);
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });

     }else if(req.query.criteria==='last50'){
         PatientModel.find().
         limit(50).
         sort({ _id: -1 }).
         select({ name: 1, occupation: 1,
             HIN:1, firstName:1, NIC:1, phone:1, Birthday:1, Address:1}).then(patients => {
             res.json(patients);
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });
     }
     else{
         PatientModel.find().populate('Alergies').populate( 'visits').exec().then(patients => {
             res.json(patients);
         }).catch(err => {
             console.error(err);
             res.sendStatus(500);
         });
     };

 });
 Router.get('/:id', (req, res) => {
     PatientModel.findById(req.params.id).populate('visits').populate('Alergies').exec().then(patient => {
         res.json(patient);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
 Router.put('/examination/:id', (req, res) => {
     console.log(req.body);
     visitModel.findByIdAndUpdate(req.params.id, {$set: {"examination": req.body}}).exec().then(visit=>{
         res.send(status);
     }).catch(err=>{
         if (err)
            res.send(err)
     });
 });
 Router.get('/Alergies/:id', (req, res) => {
     AlergyModel.findById(req.params.id).populate('Alergies').exec().then(alergy => {
         res.json(alergy || {});
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
 Router.put('/alergies/:id', (req, res) => {
     AlergyModel.findById(req.params.id, function(err, updatedalergy) {
         if (err)
             res.send(err);

         updatedalergy.alergy = req.body.alergy;
         updatedalergy.remarks = req.body.remarks;

         updatedalergy.save(function(err) {
             if (err)
                 res.send(err);

             res.json(updatedalergy);
         });
     });
 });

 Router.post('/:id/alergies', (req, res) => {
     let alergy = new AlergyModel(req.body);
     const patientID = req.params.id;
     alergy.patient = patientID;
     alergy.save().then(alergydb => {
         return PatientModel.findByIdAndUpdate(patientID, {$push: {"Alergies": alergydb._id}})
     }).then(() => {
         return PatientModel.findById(patientID).populate('Alergies').exec();
     }).then(patientDb => {
         res.json(patientDb);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });

 Router.post('/', (req, res) => {
     const patient = new PatientModel(req.body);
     patient.save().then(patient => {
         res.json(patient);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });

Router.post('/questionnaire', (req, res) => {
    const questionnaire = new QuestinnaireModel(req.body);
    questionnaire.save().then(questionnaire => {
        res.json(questionnaire);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});


Router.post('/patient/:hin/examination', (req, res) => {
    let exm=req.body;
    PatientModel.update(  { hin:exm.HIN },
        { $set:
            {
              examination:exm
            }
        }).then(patient => {
        res.json(patient);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});

 Router.post('/:id/visits', (req, res) => {
     let visit = new visitModel(req.body);
     const patientID = req.params.id;
     var visitObjid;
     visit.patient = patientID;
     visit.save().then(visitDb => {
         visitObjid=visitDb._id;
         return PatientModel.findByIdAndUpdate(patientID, {$push: {"visits": visitDb._id}})
     }).then(() => {
         return visitModel.findById(visitObjid).exec();
     }).then(patientDb => {
         res.json(patientDb);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
/* Router.delete('/Alergies/:id', (req, res) => {
     const aid = req.params.id;
     AlergyModel.findById(req.params.id).then(alergy => {
         const pid=alergy.patient;
       //  PatientModel.findByIdAndUpdate(pid, {$pull: {"Alergies":alergy._id}});
     AlergyModel.findByIdAndRemove(req.params.id).then(() => {


     }).then(() => {
         res.sendStatus(200);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });});*/
 Router.delete('/Alergies/:id', (req, res) => {
     const aid = req.params.id;

     AlergyModel.findById(req.params.id).then(alergy => {
         const pid = alergy.patient;
         return PatientModel.findByIdAndUpdate(pid, {$pull: {"Alergies": alergy._id}})
     }).then(() => {
         return AlergyModel.findByIdAndRemove(req.params.id);
     }).then(() => {
         res.sendStatus(200);
     }).catch(err => {
         console.error(err);
         res.sendStatus(500);
     });
 });
Router.put('/labOrder/:id', (req, res) => {
    console.log(req.body);
    visitModel.findByIdAndUpdate(req.params.id, {$push: {"laborders": req.body}}).exec().then(visit=>{
        res.send(status);
    }).catch(err=>{
        if (err)
            res.send(err)
    });
});
Router.put('/treatments/:id', (req, res) => {
    console.log(req.body);
    visitModel.findByIdAndUpdate(req.params.id, {$push: {"treatments": req.body}}).exec().then(visit=>{
        res.send(status);
    }).catch(err=>{
        if (err)
            res.send(err)
    });
});
Router.put('/injections/:id', (req, res) => {
    console.log(req.body);
    visitModel.findByIdAndUpdate(req.params.id, {$push: {"injections": req.body}}).exec().then(visit=>{
        res.send(status);
    }).catch(err=>{
        if (err)
            res.send(err)
    });
});
Router.put('/prescription/:id', (req, res) => {

    let data=req.body;
              visitModel.findByIdAndUpdate(req.params.id, {$push: {"prescription":req.body}}).exec().then(status=>{
               res.send(status);
            }).catch(err=>{
                if(err){
                   res.send(err);
                }
            })
    ;


 });
Router.put('/questionnaire/:id', (req, res) => {
console.log(req.params.id);
console.log(req.body);
    let data=req.body;
           QuestinnaireModel.findByIdAndUpdate(req.params.id, {$push: {"questions":req.body}}).exec().then(questions=>{
                res.send(status);
            }).catch(err=>{
                if(err){
                    res.send(err);
                }
            })
});

 module.exports = Router;