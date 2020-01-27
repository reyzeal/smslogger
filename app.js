
var nconf           = require( "nconf" );
var express         = require( 'express' );
var app             = express();
var http            = require( 'http' ).createServer( app );
var io              = require( "socket.io" )( http );
var request         = require( 'request' );
var winston         = require( "winston" );
var moment          = require( 'moment' );
var bodyparser      = require( 'body-parser' );


require( "winston-daily-rotate-file" );

var transport       = new ( winston.transports.DailyRotateFile )({
    filename    : "./Log/Log_",
    datePattern : "yyyy-MM-dd.log",
    json        : false,
    timestamp() {
        return moment().format( 'hh:mm:ss.SSS' );
    }
});

var logger = new (winston.Logger)({
    transports:[ 
        transport 
    ]
});


app.use( express.static( __dirname + "/public" ) );
app.use( bodyparser.json() );
app.use( bodyparser.urlencoded({extended: false}));

app.all( '/*', function( req, res, next ) 
{
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers" );

    next();
});

app.post( "/sms", function( req, res )
{
    logger.info( "SMS", req.body );
    res.send('Log_'+moment().format( 'YYYY-MM-DD' )+'.log');
    res.end();
});

app.post( "/mms", function( req, res )
{
    logger.info( "MMS", req.body );
    res.send('Log_'+moment().format( 'YYYY-MM-DD' )+'.log');
    res.end();
});

http.listen( 8790, function()
{
    console.log ( "running server port *:8790" );
});