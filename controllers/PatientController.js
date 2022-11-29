const Patient = require("../model/Patient");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
const errors = require('restify-errors');


// Get all patients
module.exports.getPatients = (req, res, next) => {
    console.log('GET request: patients');
    Patient.find({}).exec(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))


        apiResponse.successResponseWithData(res, "", result)
        // apiResponse.successResponseWithData(res, "success",
        //     {data: result});
    });
}

// get patient
module.exports.getPatient = async (req, res, next) => {
    // console.log('GET request: patients/' + req.params.id);
    // Find a single patient by their id


    let result = await Patient.findOne({_id: req.params.id})

    if (result) {
        apiResponse.successResponseWithData(res, "", result)
    } else {
        apiResponse.validationErrorWithData(res, "", result)
    }


}


module.exports.addPatient = (req, res, next) => {
    console.log('POST request: patient params = >' + JSON.stringify(req.params));
    console.log('POST request: patient body = >' + JSON.stringify(req.body));

    if (req.body.name === undefined) {
        apiResponse.ErrorResponse(res, 'Name must be supplied')

    }
    if (req.body.address === undefined) {
        apiResponse.ErrorResponse(res, 'Address must be supplied')

    }
    if (req.body.birthdate === undefined) {
        apiResponse.ErrorResponse(res, 'birthdate must be supplied')

    }

    if (req.body.gender === undefined) {
        apiResponse.ErrorResponse(res, "gender must be supplied")

    }

    if (req.body.phone === undefined) {
        apiResponse.ErrorResponse(res, "phone must be supplied")

    }
    // Creating new Patient.
    var newPatients = new Patient({
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        phone: req.body.phone,
        photo: req.body.photo,
        tests: [{
            title: 'khalid'
        },
            {
                title: 'hisahm'
            },
            {
                title: 'asa'
            }]
    });
    newPatients.tests.push({title:"test hisham"})


    //save
    newPatients.save(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send(201, result)
    })

}

module.exports.deletePatient = (req, res, next) => {
    console.log('DEL request: patients/' + req.params.id);
    Patient.remove({_id: req.params.id}, function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send()
    });
}