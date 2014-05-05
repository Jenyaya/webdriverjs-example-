var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    httptest = require('httptest');


describe('API test', function () {

    var url = 'http://172.22.194.148:5000'

    it('Run', function () {

        httptest(url)
            .get('/api')
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                var res = JSON.parse(res);
                res.should.have.property('status', 'running');
                console.log(res.status);
                done();
            });

    });


});


