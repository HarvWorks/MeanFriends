////////////////////////////////////////////////////////////
//                       Variables                        //
////////////////////////////////////////////////////////////

var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    models_path = path.join(__dirname, './../models'),
    db_path = 'mongodb://localhost/mongoose_friends';

mongoose.connect(db_path);

////////////////////////////////////////////////////////////
//                   Connection Events                    //
////////////////////////////////////////////////////////////

/*                       Connected                        */

mongoose.connection.on( 'connected', function () {
    console.log( 'Mongoose connected to ' + db_path );
});

/*                         Error                          */

mongoose.connection.on( 'error', function ( err ) {
    console.error( 'Mongoose connected error: ' + err );
});

/*                     Disconnected                       */

mongoose.connection.on( 'disconnected', function () {
    console.log( 'Mongoose has been disconnected' );
});

/*                    End Connection                      */

process.on( 'SIGINT', function() {
    mongoose.connection.close( function () {
        console.log( 'Mongoose has been disconnected due to the termination of the app' );
        process.exit( 0 );
    });
});

////////////////////////////////////////////////////////////
//               Requiring all model files                //
////////////////////////////////////////////////////////////

fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        console.log("Model loaded");
        require(models_path + '/' + file);
    }
});
