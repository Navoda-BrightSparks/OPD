
'use strict';
const Queue = require('queuejs');
var queue = new Queue();
var opdNo=0;
const bodyParser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//notfication variable
var notify=[{
    pid: {
        type: String
    },
    disease: {
        type: String
    }}];

var patient=require('./server/models/patient.model');
var visit=require('./server/models/visit.model');
var alergy=require('./server/models/Alergy.model');
var questionanaire=require('./server/models/questionnaire.model');
const  DRoute=require('./server/routes/doctor.route.js');
const  NRoute=require('./server/routes/nurse.route.js');
const  DashRoute=require('./server/routes/dashboard.route.js');
const app = express();

app.use('/', express.static(__dirname+'/public'));
app.use('/modules', express.static(__dirname+'/../bower_components'));
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/PatientProfile', err => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/patients',DRoute);
app.use('/patients',NRoute);
app.use('/dashboard',DashRoute);

app.get('/notify', (req, res, next) => {
    res.send({patients:notify});
});
app.put('/notify/:id', (req, res, next) => {

    notify.push(req.body);
    res.send(200);
});
//queue
app.put('/queue',(req, res, next) => {
    console.log("Enqueue");
    var p={"name":req.query.name,"hin":req.query.hin,"id":req.query.id};
    queue.enq(p);
    opdNo++;
    res.send({status:200,opdNo:opdNo});
});

app.get('/queue',(req, res, next) => {
    if(req.query.peek){
        if(!queue.isEmpty()){
            var patient=queue.peek();
            res.json(patient);
        }else{
            res.send('empty');
        }
    }else{
        if(!queue.isEmpty()){
            var patient=queue.deq();
            res.json(patient);
        }else{
            res.send('empty');
        }
    }
});
//end queue
app.listen(3000, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('app listening on port 3000');
});

module.exports=app;