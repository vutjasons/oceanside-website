const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./DB');


    const itemsRoute = require('./routes/items.route');
    const userRoutes = require("./routes/user");
    mongoose.Promise = global.Promise;
    mongoose.connect(config.DB, {useNewUrlParser: true}).then( ()=> {console.log('Database is connected')}, err => {console.log('Can not connect to database' + err)}
    );

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use('/', itemsRoute);
    app.use('/api/user', userRoutes);

    const port = process.env.PORT || 4000;

    const server = app.listen(port, function () {
      console.log('Listening on port' + port);
    })
