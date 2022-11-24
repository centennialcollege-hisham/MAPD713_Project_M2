const patient = require("../model/Patient");


// Get all patients
module.exports.getPatients = (req, res, next) => {
    console.log('GET request: patients');
    patient.find({}).exec(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send(result);
    });
}

// get patient
module.exports.getPatient = (req, res, next) => {
    console.log('GET request: patients/' + req.params.id);
    // Find a single patient by their id
    patient.find({_id: req.params.id}).exec(function (error, patient) {
        if (patient) {
            res.send(patient)
        } else {
            res.send(404)
        }
    })
}

// get tests
module.exports.getTests = (req, res, next) => {
    // Find a single patient by their id
    patient.find({_id: req.params.id}).exec(function (error, patient) {
        if (patient) {
            res.send(patient )
        } else {
            res.send(404)
        }
    })
}

module.exports.addTests = (req, res, next) => {
    console.log('POST request: patient params = >' + JSON.stringify(req.params));
    console.log('POST request: patient body = >' + JSON.stringify(req.body));

    if (req.body.title === undefined) {
        return next(new errors.BadRequestError('title must be supplied'))
    }


    // Find a single patient by their id
    patient.find({_id: req.params.id}).exec(function (error, patient) {
        if (patient) {

         patient.

            //save
            patient.save(function (error, result) {
                if (error) return next(new Error(JSON.stringify(error.errors)))
                res.send(201, result)
            })


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
    var newPatients = new patient({
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        phone: req.body.phone,
        photo: req.body.photo,
    });

    //save
    newPatients.save(function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send(201, result)
    })

}

module.exports.deletePatient = (req, res, next) => {
    console.log('DEL request: patients/' + req.params.id);
    patient.remove({_id: req.params.id}, function (error, result) {
        if (error) return next(new Error(JSON.stringify(error.errors)))
        res.send()
    });
}