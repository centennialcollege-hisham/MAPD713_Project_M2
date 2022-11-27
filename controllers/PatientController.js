const Patient = require("../model/Patient");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");


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

    //
    // let result = await Patient.findOne({_id: req.params.id})
    //
    // if (result) {
    //     apiResponse.successResponseWithData(res, "", result)
    // } else {
    //     apiResponse.validationErrorWithData(res, "", result)
    // }


    let data = await Patient.findOne({
            "_id": req.params.id, // patient Id
        }, {
            tests: {"$elemMatch": {"_id": mongoose.Types.ObjectId("6382c7eaeb7575253f0c97b5")}} // patient record id
        }
    )

    if (!data)
        res.send(data);

    res.send(200,data.tests[0]);


}

// get tests
module.exports.addTest = (req, res, next) => {
    var update = {tests: req.body}
    var filter = {_id: req.params.id}
    // Find a single patient by their id
    Patient.findOneAndUpdate(filter, update).exec(
        function (error, patient) {
            if (patient) {
                res.send(patient[tests])
            } else {
                res.send(404)
            }
        })
}


module.exports.addPatient = (req, res, next) => {
    console.log('POST request: patient params = >' + JSON.stringify(req.params));
    console.log('POST request: patient body = >' + JSON.stringify(req.body));

    if (req.body.name === undefined) {
        return next(new errors.BadRequestError('Name must be supplied'))
    }
    if (req.body.address === undefined) {
        return next(new errors.BadRequestError('Address must be supplied'))
    }
    if (req.body.birthdate === undefined) {
        return next(new errors.BadRequestError('birthdate must be supplied'))
    }

    if (req.body.gender === undefined) {
        return next(new errors.BadRequestError('gender must be supplied'))
    }

    if (req.body.phone === undefined) {
        return next(new errors.BadRequestError('phone must be supplied'))
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