var assert = require('assert');
var expect = require("chai").expect;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});


describe('HelloWorld', function(){
	it('should say hello world', function(done){
		request.get('index.html').end(function assert(err,res){
			expect(res.test).to.equal('Hello world!');
		});
	});
});