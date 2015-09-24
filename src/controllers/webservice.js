var express = require('express'),
   router = express.Router(),
   response = require('../helpers/response'),
   Q = require('q'),
   _ = require('lodash');

router.get('/', rootHandler);
router.get('/exampleDelay', exampleDelayHandler);

module.exports = router;

function rootHandler(req, res){
   response.ok(res)();
}

function exampleDelayHandler(req, res){
   var duration = parseInt(req.query.duration);
   Q
   .try(exampleDelay, duration)
   .then(response.json(res))
   .catch(response.fault(res));
}


function exampleDelay(duration){
  if ( !_.isFinite(duration) ) {
      throw new Error("Parameter duration must be number of seconds to delay");
   }
   return Q
   .delay(duration*1000)
   .thenResolve({"message": "Delayed "+duration+" seconds."});
}
