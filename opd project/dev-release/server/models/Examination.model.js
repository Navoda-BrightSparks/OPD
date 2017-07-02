'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExaminationSchema = new Schema({
    date: {
        type:Date, default:new Date()
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    BMI:{
        type:Number
    },
    temperature:{
        type:Number
    },
    sBP:{
        type:Number
    }
    ,
    dBP:{
        type:Number
    }
});

const Examination = mongoose.model('Examination', ExaminationSchema);

module.exports = Examination;
