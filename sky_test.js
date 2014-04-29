var chai        = require('chai'),
    assert      = chai.assert,
    expect      = chai.expect,
    webdriverjs = require('webdriverjs');
    
describe ('Login to Sky test' , function () {
 	this.timeout(999999)
	 var client = {};
	 var login = 'unl', pass = 'test1234';
 
 	before ( function(){
 		client = webdriverjs.remote({ desiredCapabilities: {browserName: 'chrome'} });
 		client.init();
	 });


	it ('Login to Sky', function(done) {
		client
			.url('http://www.sky.com')
			
			.click("a[name='skycom-signin']", function (err, result){
				expect(err).to.be.null;
				
			})
		
			
			.call(done);
	
	});
	
	
	it ( 'Validate login fields', function(done) {
		client 
			
			.isVisible('#username', function(err, username){
			 	expect(err).to.be.null;
				expect(username).to.be.true
			})
			
			.isVisible('#password', function(err, username){
			 	expect(err).to.be.null;
				expect(username).to.be.true
			
			})
	
			.call(done);
	
	
	});
	
	
	it ( 'Login', function(done){
		client
		
			.setValue('#username', login, function(err){
			 	expect(err).to.be.null;
			})
			
			.setValue('#password', pass, function(err){
			 	expect(err).to.be.null;
			})
			
			.getValue('#username', function(err, value){				
				assert.strictEqual(value,login);
			})
			
			.getValue('#password', function(err, value){				
				assert.strictEqual(value,pass);
			})
			
			.buttonClick('#signinButton', function (err, result){
				expect(err).to.be.null;			
			})
	
			.call(done);
	
	})
	
	
		it ( 'Check that logged in', function(done){
		client
		
			.isVisible('#captcha', function(err, field){
			 	expect(err).to.be.null;
				expect(field).to.be.true
			
			})
			
			.call(done);
				
			})
	
	
	

  	after(function(done) {
        client.end(done);
    });

}); 