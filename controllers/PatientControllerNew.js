const Patient = require("../model/Patient");
const apiResponse = require("../helpers/apiResponse");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

/**
 * Patient List.
 *
 * @returns {Object}
 */

exports.getPatients1 = async (req, res) => {
    console.log('GET request: patients');
    try {
        let searchObj = {}
        let query = await Patient.find()

        query.then((list) => {
            if (list.length > 0) {
                 apiResponse.successResponseWithData(res, "success",
                    {data: list});
            } else {
                 apiResponse.notFoundResponse(res, "Data not found");
            }
        });
    } catch (err) {
        //throw error in json response with status 500.
         res.status(404)
    }
};



/**
 * Patient List.
 *
 * @returns {Object}
 */
exports.patientList = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
        let searchObj = {}
        if(req.query.onlyCritical){
            searchObj.condition = 'critical'
        }
        let query = Patient.find(searchObj);
        query.sort({ createdAt: 1 });
        if (req.query.page) {
            query.skip((pageNumber - 1) * limit);
            query.limit(limit);
        }
        const count = await Patient.count(searchObj)
        let currentPage = pageNumber
        let totalCount = count
        let itemPerPage = limit
        let totalPage = Math.ceil(totalCount/itemPerPage)
        query.then((patients) => {
            if (patients.length > 0) {
                return apiResponse.successResponseWithData(res, "success",
                    {data: patients});
            } else {
                return apiResponse.notFoundResponse(res, "Data not found");
            }
        });
    } catch (err) {
        //throw error in json response with status 500.
        return apiResponse.ErrorResponse(res, err);
    }
};

