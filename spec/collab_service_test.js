/**
 * Created by Taisiya.Pyekalyeva on 4/30/14.
 */

var request = require('request'),
    assert = require('assert'),
    should = require('chai').should(),
    expect = require('chai').expect(),
    underscore = require('underscore'),
    path = require('path'),
    express = require('express'),
    httptest = require('httptest');

var url = 'http://localhost:5000';
var session_id = 'd3cad8ec-98b9-455f-85e9-484c98eaad80';
var unknown_session_id = 'e21bf675-dcc6-40c1-b02f-e97cb72caf1f';
var iuid = '54867a26-dce9-43e8-91e1-1b25264ad9a7';
var unknown_iuid = 'e0d0cd60-c3d5-4df0-9e4a-1d6a778b6830';
var user_id = 'c85bef7a-aedd-4f71-83fe-866ed3be328d';
var unknown_user_id = '2128262c-8b26-4d18-ad10-4ac7c9f4cf79';


    describe('Tests for collaboration mocked service status', function () {

        var url = 'http://localhost:5000';

        it('should returns status code 200', function (done) {
            httptest(url)
                .get('/api')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });
        });

        it('should returns status "running"', function (done) {
            httptest(url)
                .get('/api')
                .end(function (err, res) {
                    if (err) throw err;
                    var res = JSON.parse(res);
                    res.should.have.property('status', 'running');
                    done();
                });
        });
    });

    describe('Tests for collaboration service sessions operations', function () {


        it('should be response 200', function (done) {
            httptest(url)
                .get('/api')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });
        });
        it('should be response status', function (done) {
            httptest(url)
                .get('/api')
                .end(function (err, res) {
                    if (err) throw err;
                    var res = JSON.parse(res);
                    res.should.have.property('status', 'running');
                    done();
                });
        });

        it('should returns current sessions', function (done) {
            httptest(url)
                .get('/api/sessions/')
                .end(function (err, res) {
                    if (err) throw err;

                    for (var i = 0; i < res.length; i++) {
                        var result = res[i];
                        if (result.id == session_id) {
                            result.should.have.property('id', session_id);
                        }
                    }

                    done();

                });
        });

        it('should returns sessions code status', function (done) {

            httptest(url)
                .get('/api/sessions/')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });

        });

        it('post operation should returns code status 200', function (done) {

            httptest(url)
                .post('/api/sessions/')
                .expect(201)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });

        });


        it('put operation should returns sessions code status 204', function (done) {

            httptest(url)
                .put('/api/sessions/' + session_id + '')
                .expect(204)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });
        });

        it('put operation should returns sessions code status 404', function (done) {

            httptest(url)
                .put('/api/sessions/' + unknown_session_id + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });
        });

        it('delete operation should returns sessions code status 204', function (done) {

            httptest(url)
                .del('/api/sessions/' + session_id + '')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });
        });

        it('delete operation should returns sessions code status 404', function (done) {

            httptest(url)
                .del('/api/sessions/' + unknown_session_id + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;
                    done();
                });
        });

        it('should returns all users by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/users')
                .expectJSON()
                .end(function (err, res) {
                    if (err) throw err;

                    for (var i = 0; i < res.length; i++) {
                        var result = res[i];
                        if (result.name == 'John Doe') {

                            result.should.have.property('name', 'John Doe');

                        }
                        else {
                            result.should.have.property('name', 'Dave Jones');
                        }
                    }

                    done();

                });
        });
    });

    describe('Tests for operations with users ', function () {

        it('should returns all users by session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/users')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });

        it('should returns all users by undefined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + unknown_session_id + '/users')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });

        it('should returns user information by existing user_id', function (done) {

            var idJoin = 'c85bef7a-aedd-4f71-83fe-866ed3be328d'

            httptest(url)
                .get('/api/sessions/' + session_id + '/users/' + idJoin + '')
                .expectJSON()
                .end(function (err, res) {
                    if (err) throw err;

                    for (var i = 0; i < res.length; i++) {
                        var result = res[i];
                        if (result.name == 'John Doe') {

                            result.should.have.property('name', 'John Doe');

                        }

                    }

                    done();

                });
        });

        it('should returns status code 200 when user delete successfully', function (done) {

            httptest(url)
                .del('/api/sessions/' + session_id + '/users')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });

        it('should returns status code 404 when user has not been found', function (done) {

            httptest(url)
                .del('/api/sessions/' + unknown_session_id + '/users')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });

        it('should returns status code 200 by user_id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/users/' + user_id + '')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        var result = res[i];
                        if (result.name == 'John Doe') {

                            result.should.have.property('name', 'John Doe');
                        }
                    }

                    done();

                });
        });

        it('should returns status code 404 by unknown user_id', function (done) {


            httptest(url)
                .get('/api/sessions/' + session_id + '/users/' + unknown_user_id + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });


        it('should returns status code 200 when user deleted by user_id', function (done) {

            httptest(url)
                .del('/api/sessions/' + session_id + '/users/' + user_id + '')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });

        it('should returns status code 404 when user has not been deleted', function (done) {

            httptest(url)
                .del('/api/sessions/' + session_id + '/users/' + unknown_user_id + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });

        it('should returns users status online/offline by user_id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/users/' + user_id + '/status')
                .expect(200)
                .expectJSON()
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                    res.should.have.property('status', 'online');

                });
        });

        it('should returns users status code 404 by unknown_user_id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/users/' + unknown_user_id + '/status')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;
                    done();

                });
        });

    });

    describe('Tests for operations with actions ', function () {
        it('should returns all actions by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/actions')
                .end(function (err, res) {
                    if (err) throw err;

                    var res = JSON.parse(res);

                    for (var i = 0; i < res.length; i++) {
                        var result = res[i];
                        if ((result.name == 'updateAsset') && (result.name == 'deleteAsset') &&
                            (result.name == 'sendMessage')) {
                            assert(true, 'result contains all operations');
                            done();

                        }

                    }

                    done();

                });
        });

        it('should returns status code 200 when get actions by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/actions')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when get actions by undefined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + unknown_session_id + '/actions')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 200 when post action by session id', function (done) {

            httptest(url)
                .post('/api/sessions/' + session_id + '/actions')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when post action by session id', function (done) {

            httptest(url)
                .post('/api/sessions/' + unknown_session_id + '/actions')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

    });

    describe('Tests for operations with objects ', function () {
        it('should returns all objects by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/objects')
                .expectJSON()
                .end(function (err, res) {
                    if (err) throw err;

                    for (var i = 0; i < res.length; i++) {
                        var result = res[i];
                        if ((result.type == 'asset') && (result.paramSet.name == 'Super movie')) {
                            assert(true, 'result contains all objects');
                            done();
                            break;

                        }
                        else {
                            assert(false, 'result is not contains all objects');
                        }
                        done();

                    }
                    ;
                });
        });

        it('should returns status code 200 when get objects by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/objects')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when get objects by undefined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + unknown_session_id + '/objects')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });


        it('should returns status code 200 when post action by session id', function (done) {

            httptest(url)
                .post('/api/sessions/' + session_id + '/objects')
                .expect(201)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when post object by session id', function (done) {

            httptest(url)
                .post('/api/sessions/' + unknown_session_id + '/objects')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });
    });

    describe('Tests for operations with invites ', function () {
        it('should returns all invites by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/invites')
                .expectJSON()
                .end(function (err, res) {
                    if (err) throw err;

                    for (var i = 0; i < res.length; i++) {
                        var result = res[i];
                        if (result.service_id == 'user') {
                            assert(true, 'result contains verified value');
                        }
                        else if (result.service_id == 'email') {
                            assert(true, 'result contains verified value');
                        }

                        else if (result.service_id == 'facebook') {
                            assert(true, 'result contains verified value');
                            done();
                            break;
                        }

                        else {
                            assert(false, 'result is not contains any verified values');
                        }
                    }

                });
        });

        it('should returns status code 200 when get invites by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/invites')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when get invites by undefined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + unknown_session_id + '/invites')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });


        it('should returns status code 200 when post invite by session id', function (done) {

            httptest(url)
                .post('/api/sessions/' + session_id + '/invites')
                .expect(201)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when post invite by session id', function (done) {

            httptest(url)
                .post('/api/sessions/' + unknown_session_id + '/invites')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });
    });

    describe('Tests for operations with invites for specified invited user id', function () {
        it('should returns all information about invited user id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/invites/' + iuid + '')
                .expectJSON()
                .end(function (err, res) {
                    if (err) throw err;
                    if (res.id == iuid) {
                        res.should.have.property('id', iuid);
                        done();
                    }

                    else {
                        assert(false, 'result is not contains any verified values');
                        done();
                    }
                });
        });

        it('should returns status code 200 when get invites by defined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + session_id + '/invites/' + iuid + '')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when get invites by undefined session id', function (done) {

            httptest(url)
                .get('/api/sessions/' + unknown_session_id + '/invites/' + unknown_iuid + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });


        it('should returns status code 200 when post invite by session id', function (done) {

            httptest(url)
                .patch('/api/sessions/' + session_id + '/invites/' + iuid + '')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when post invite by session id', function (done) {

            httptest(url)
                .patch('/api/sessions/' + session_id + '/invites/' + unknown_iuid + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 200 when post invite by session id', function (done) {

            httptest(url)
                .del('/api/sessions/' + session_id + '/invites/' + iuid + '')
                .expect(200)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when post invite by unknown session id', function (done) {

            httptest(url)
                .del('/api/sessions/' + unknown_session_id + '/invites/' + iuid + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });

        it('should returns status code 404 when post invite by unknown invited id', function (done) {

            httptest(url)
                .del('/api/sessions/' + session_id + '/invites/' + unknown_iuid + '')
                .expect(404)
                .end(function (err, res) {
                    if (err) throw err;

                    done();

                });
        });
    });




