var config = require('config'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    _ = require('lodash');

var wsConfig = config.webservice;

function run(){
   var app = express();

   app.use(morgan('short'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: true}));

   app.use(require('./controllers/webservice'));

   console.log('Configuration sources', _.pluck(config.util.getConfigSources(), 'name'));
   app.listen(wsConfig.httpd.port, wsConfig.httpd.host, function(){
      console.log('Express server listening on http://%s:%s', wsConfig.httpd.host, wsConfig.httpd.port);
   });
}
module.exports.run = run;

if ( require.main === module ) {
   run();
}
