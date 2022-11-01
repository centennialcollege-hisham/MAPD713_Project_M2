const patient = require("../model/Patient");


module.exports.getPatients = (req, res, next) => {
    console.log('GET request: patients');
    // Find every entity within the given collection
    patient.find({}).exec(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send(result);
    });
}

//showing add page
module.exports.getPatient = (req, res, next) => {
    console.log('GET request: patients/' + req.params.id);

    // Find a single patient by their id
    patient.find({_id: req.params.id}).exec(function (error, patients) {
        if (patients) {
            // Send the patients if no issues
            res.send(patients)
        } else {
            // Send 404 header if the patient doesn't exist
            res.send(404)
        }
    })
}

//processing the add page using module exports
module.exports.addPatient = (req, res, next) => {
    console.log('POST request: patient params=>' + JSON.stringify(req.params));
    console.log('POST redquest: patient body=>' + JSON.stringify(req.body));


    // Make sure name is defined
    if (req.body.name === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(new errors.BadRequestError('First Name must be supplied'))
    }
    if (req.body.address === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(new errors.BadRequestError('Address must be supplied'))
    }
    if (req.body.birthdate === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(new errors.BadRequestError('Date of Birth must be supplied'))
    }

    if (req.body.gender === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(new errors.BadRequestError('gender must be supplied'))
    }

    if (req.body.phone === undefined) {
        // If there are any errors, pass them to next in the correct format
        return next(new errors.BadRequestError('Bed Number must be supplied'))
    }
    // Creating new Patient.
    var newPatients = new patient({
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        phone: req.body.phone,
        photo: req.body.photo,
    });

    // Create the patient and saving to db
    newPatients.save(function (error, result) {
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new Error(JSON.stringify(error.errors)))
        // Send the patient if no issues
        res.send(201, result)
    })

}

//performing the deletion of business contact
module.exports.deletePatient = (req, res, next) => {
    console.log('DEL request: patients/' + req.params.id);
    patient.remove({_id: req.params.id}, function (error, result) {
        // If there are any errors, pass them to next in the correct format
        if (error) return next(new Error(JSON.stringify(error.errors)))

        // Send a 200 OK response
        res.send()
    });
}