'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionnarireSchema = new Schema({
    name: {
        type:String
    },
    relateTo: {
        type: String
    },

    remarks:{
        type:String
    },
    questions:[{questionText:{type:String},
        answerType:{type:String}

    }]
});

const questionnaire = mongoose.model('questionnaire', QuestionnarireSchema);

module.exports = questionnaire;
