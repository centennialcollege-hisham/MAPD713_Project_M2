let mongoose = require('mongoose');
let PatientRecords = require('./PatientRecord')
let patientModel =  mongoose.Schema({
    name: String,
    address: String,
    birthdate: String,
    gender: String,
    phone: String,
    photo: String,
    tests: [
        {
            title:String
        }
    ]
},{
    collection: "patientApp"
});

module.exports = mongoose.model('Patient', patientModel);