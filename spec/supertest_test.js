var should = require('should');
var request = require('supertest');
var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect


describe('Super test example', function () {

    var url = 'http://172.22.194.148:5000';

    it('Call GET', function (done) {
        request(url)
            .get('/api')
            .expect(200)

            .end(function (err, res) {
                if (err) {
                    throw err;
                }

                res.body.should.have.property('status');
                res.body.status.should.equal('running');
                done();

            });


    });


    it('Call GET/Sessions', function (done) {
        request(url)
            .get('/api/sessions/')
            .expect(200)

            .end(function (err, res) {
                if (err) {
                    throw err;
                }

               /* res.body.should.have.property('id');
                res.body.id.should.equal('d3cad8ec-98b9-455f-85e9-484c98eaad80');*/

                console.log(res.body[0].id);


                for (var key in res.body[0]) {

                    console.log(key + ' : ' + res.body[0][key]);
                    res.body[0].should.have.property(key);
                }

                done();

            });


    });

})
