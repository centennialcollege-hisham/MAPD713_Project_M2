const Patient = require("../model/Patient");
const apiResponse = require("../helpers/apiResponse");
const {getTests} = require("./TestController");





// Get all patients
module.exports.getPatients = (req, res, next) => {
    console.log('GET request: patients');
    Patient.find({}).exec(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))



        res.send(apiResponse.successResponseWithData(1,"",result));
        // apiResponse.successResponseWithData(res, "success",
        //     {data: result});
    });
}

// get patient
module.exports.getPatient = (req, res, next) => {
    console.log('GET request: patients/' + req.params.id);
    // Find a single patient by their id
    Patient.findOne({_id: req.params.id,tests: {
        $elementMatch: {
            _id: "6382582e14c1ac0d506beccd"
        }
        }}, {tests: 1}).exec(function (error, patient) {
        if (patient) {
            res.send(patient.tests) //dfgdfgdfgdfgdfgdg

        } else {
            res.send(404)
        }
    })
}

// get tests
module.exports.addTest = (req, res, next) => {
    var update = {tests: req.body}
    var filter = {_id: req.params.id}
    // Find a single patient by their id
    Patient.findOneAndUpdate(filter,update).exec(
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