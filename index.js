/**
 Milestone Project for MAPD-713 - M3
 Hisham Abu Sanimeh - 301289364
 Fernando Quezada - 301286477
 */

const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config/config')

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI,
        {useNewUrlParser: true}
    );
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => {
    require('./routes/customers')(server);
    console.log(`server started on port ${config.PORT}`)
})

