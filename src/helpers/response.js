function ok(res){
   return function(){
      var response = {
         timestamp: Math.floor(Date.now()/1000)
      };
      res.status(200).send(response);
   };
}
module.exports.ok = ok;

/*
 * Typically used to catch an application promise chain fault rather than an
 * application process error.
 */
function fault(res, dispatchData){
   var f = function(error){
      var errorObj = {error: {}};
      if ( error.stack ) {
         // Assume we've caught a JS native error
         console.error(error.stack);
         errorObj.error.stack = error.stack;
         errorObj.error.message = error.message;
      } else {
         console.error(error);
         errorObj.error = error;
      }
      res.status(500).send(errorObj);
   };
   if ( arguments.length > 1 ) {
      return f(dispatchData);
   }
   return f;
}
module.exports.fault = fault;

/*
 * Provides a promise chain element to respond with a JSON document and 200 OK
 * status code, if dispatchData is supplied it will be sent immediately.
 */
function json(res, dispatchData){
   var f = function(what){
      if ( typeof what === 'undefined' ) {
         what = {};
      }
      var statusCode = 200;
      if ( typeof what === 'object' ) {
         what.timestamp = Math.floor(Date.now()/1000);
      }
      res.status(statusCode).send(what);
   };
   if ( arguments.length > 1 ) {
      return f(dispatchData);
   }
   return f;
}
module.exports.json = json;
