const Patient = require("../model/Patient");
const apiResponse = require("../helpers/ApiResponse");
var mongoose = require("mongoose");


// Get all patients
module.exports.getPatients = (req, res, next) => {
    console.log('GET request: patients');
    Patient.find({}).exec(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))

        apiResponse.successResponseWithData(res, "", result)

    });
}

// get patient
module.exports.getPatient = async (req, res, next) => {


    let result = await Patient.findOne({_id: req.params.id})

    if (result) {
        apiResponse.successResponseWithData(res, "", result)
    } else {
        apiResponse.validationErrorWithData(res, "", result)
    }


}

// get patient
module.exports.updatePatient = async (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        apiResponse.validationErrorWithData(
            res,
            "Invalid Error.",
            "Invalid ID"
        );
    } else {
        Patient.findById(req.params.id, function (err, foundPatient) {
            if (foundPatient === null) {
                apiResponse.notFoundResponse(res, "Patient not exists with this id");
            } else {

                if (req.body.name) {
                    foundPatient.name = req.body.name;
                }
                if (req.body.address) {
                    foundPatient.address = req.body.address;
                }

                if (req.body.mobile) {
                    foundPatient.mobile = req.body.mobile;
                }

                if (req.body.email) {
                    foundPatient.email = req.body.email;
                }

                if (req.body.birthdate) {
                    foundPatient.birthdate = req.body.birthdate;
                }
                if (req.body.gender) {
                    foundPatient.gender = req.body.gender;
                }

                if (req.body.photo) {
                    foundPatient.photo = req.body.photo;
                }


                //update patient.
                Patient.findByIdAndUpdate(
                    req.params.id,
                    foundPatient,
                    {},
                    function (err) {
                        if (err) {
                            apiResponse.ErrorResponse(res, err);
                        } else {
                            apiResponse.successResponseWithData(res, "Patient update Success.", foundPatient);
                        }
                    }
                );
            }
        });

    }


}


module.exports.addPatient = (req, res, next) => {
    console.log('POST request: patient params = >' + JSON.stringify(req.params));
    console.log('POST request: patient body = >' + JSON.stringify(req.body));

    if (req.body.name === undefined) {
        apiResponse.ErrorResponse(res, 'Name must be supplied')
        return

    }
    if (req.body.address === undefined) {
        apiResponse.ErrorResponse(res, 'Address must be supplied')
        return

    }
    if (req.body.email === undefined) {
        apiResponse.ErrorResponse(res, 'email must be supplied')
        return

    }
    if (req.body.birthdate === undefined) {
        apiResponse.ErrorResponse(res, 'birthdate must be supplied')
        return

    }

    if (req.body.gender === undefined) {
        apiResponse.ErrorResponse(res, "gender must be supplied")
        return

    }

    if (req.body.mobile === undefined) {
        apiResponse.ErrorResponse(res, "mobile must be supplied")

    }

    // Creating new Patient.
    var newPatients = new Patient({
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile,
        email: req.body.email,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        photo: req.body.photo,
        tests: [{
            date: '2022-11-28T14:51:06.157Z',
            type: 'blood_pressure',
            reading: '60/150'
        }]
    });
    var readingValue = newPatients.tests[newPatients.tests.length - 1].reading

    if (readingValue == '50/90') {
        newPatients.condition = 'normal'
    } else if (readingValue == '60/150') {
        newPatients.condition = 'critical'

    }


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
        apiResponse.successResponse(res, "Patient Deleted")
    });
}