'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlergySchema = new Schema({
    alergy: {
        type: String
    },

    remarks: {
        type: String
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    }


});

const Alergy = mongoose.model('Alergy', AlergySchema);

module.exports = Alergy;
