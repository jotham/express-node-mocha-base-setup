var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    config = require('config');

describe('Example webservice test', function(){

   this.timeout(10000);

   var api = supertest(config.mocha.webserviceUrl);

   it('should return 200 OK for the root', function(done){
      api
      .get('/')
      .expect(200)
      .end(function(err, res){
         if ( err ) return done(err);
         done();
      });
   });

   it('should return an error if not duration is provided', function(done){
      api
      .get('/exampleDelay')
      .query({duration: 'notANumber'})
      .expect(500)
      .end(function(err, res){
         if ( err ) return done(err);
         expect(res.body).to.have.property('error');
         done();
      });
   });

   it('should return a result after a duration of two seconds', function(done){
      var ts = Date.now();
      var durationSeconds = 2;
      api
      .get('/exampleDelay')
      .query({duration: durationSeconds})
      .expect(200)
      .end(function(err, res){
         if ( err ) return done(err);
         var timeDelta = Date.now()-ts;
         expect(timeDelta).to.be.above(durationSeconds*1000);
         done();
      });
   });

});
