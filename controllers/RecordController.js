const Patient = require("../model/Patient");
const mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");

// Get all test
module.exports.getRecords = async (req, res, next) => {
    let data = await Patient.findOne(
        {"_id": req.params.id}, {"tests": 1}
    )
    if (!data)
        apiResponse.validationErrorWithData(res, "", data)

    apiResponse.successResponseWithData(res, "", data.tests)
}


// Get  test id
module.exports.getRecord = async (req, res, next) => {
    let data = await Patient.findOne({
            "_id": req.params.id, // patient Id
        }, {
            tests: {"$elemMatch": {"_id": mongoose.Types.ObjectId(req.params.testId)}} // patient record id
        }
    )


    if (!data)
        apiResponse.validationErrorWithData(res, "", data)

    apiResponse.successResponseWithData(res, "", data.tests[0])


}


module.exports.addRecord = async (req, res, next) => {
    let patient = await Patient.findById(req.params.id)

    if (req.params.title === undefined) {
        apiResponse.ErrorResponse(res, 'Title must be supplied')
    }

    patient.tests.push({title: req.params.title})
    // Creating new Patient.


    //save
    patient.save(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send(201, result)
    })

}


module.exports.updateRecord = async (req, res, next) => {
    let data = Patient.findOneAndUpdate({_id: req.params.id, 'tests._id': req.params.testId}, {
        '$set': {
            'tests.$.title': req.params.title
        }
    }, function (err) {
        if (err) return next(new Error(JSON.stringify(err.e)))

    })

    try {
        console.log("update_test " + data.toString())
        apiResponse.successResponseWithData(res, "Updated Successfully")

    } catch (err) {
        apiResponse.ErrorResponse(res, err.message)
    }


}
