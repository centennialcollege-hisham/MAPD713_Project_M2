/**
 Milestone Project for MAPD-713 - M2
 Hisham Abu Sanimeh - 301289364
 Fernando Quezada - 301286477
 */

var DEFAULT_PORT = 5002
var DEFAULT_HOST = '127.0.0.1'
var SERVER_NAME = 'PatientHealth'

var mongoose = require("mongoose");

var port = process.env.PORT;
var ipAddress = process.env.IP;

//Local DB
var url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/data';
mongoose.connect(url, {useNewUrlParser: true});


// Connect Local DB
const db = mongoose.connection;
db.once('open', function () {
    console.log("Connected to database: " + url)
});
db.on('error', console.error.bind(console, 'connection error:'));


let patientController = require('./controllers/PatientController');

var errors = require('restify-errors');
var restify = require('restify')

// Create the restify server
var server = restify.createServer({name: SERVER_NAME})

if (typeof ipAddress === "undefined") {
    //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
    console.warn('No process.env.IP var, using default: ' + DEFAULT_HOST);
    ipAddress = DEFAULT_HOST;
};

if (typeof port === "undefined") {
    console.warn('No process.env.PORT var, using default port: ' + DEFAULT_PORT);
    port = DEFAULT_PORT;
};

server.listen(port, ipAddress, function () {
    console.log('Server %s listening at %s', server.name, server.url)
    console.log('Resources:')
    console.log(' /patients')
    console.log(' /patients/:id')
})

server.use(restify.plugins.fullResponse())
    .use(restify.plugins.bodyParser())

// Get all patients
server.get('/patients', patientController.getPatients)

// Get a patient by  id
server.get('/patients/:id', patientController.getPatient)

// Create a new patient
server.post('/patients', patientController.addPatient)

// Delete patient with the given id
server.del('/patients/:id', patientController.deletePatient)