const errors = require('restify-errors');
const patientController = require("../controllers/PatientController");
const patient = require('../model/Patient')

module.exports = server => {
    server.get('/customers', async (req, res, next) => {
        try {
            const patients= await patient.find({});
            res.send(patients);
            next();

        } catch (err) {

            return next(new errors.InvalidContentError(err))
        }
    });

 // Get all patients
    server.get('/patients', patientController.getPatients)

// Get a patient by  id
    server.get('/patients/:id', patientController.getPatient)

// Create a new patient
    server.post('/patients', patientController.addPatient)

// Delete patient with the given id
    server.del('/patients/:id', patientController.deletePatient)


// Get all tests

    server.get('/patients/:id/tests', patientController.getTests)


};

// Create a new patient
