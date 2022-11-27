const patient = require("../model/Patient");
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
module.exports.getRecordsById = async (req, res, next) => {
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