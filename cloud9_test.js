var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect,
    webdriverjs = require('webdriverjs');


describe('Cloud9 test', function () {
    this.timeout(999999)
    var client = {};


    before(function () {
        client = webdriverjs.remote({ desiredCapabilities: {browserName: 'chrome'} });
        client.init();

        client.addCommand("getUrl", function (customVar, cb) {
            this.url(function (err, urlResult) {

                var specialResult = {url: urlResult.value};
                cb(err, specialResult);

            });
        });


    });

    after(function (done) {
        client.end(done);
    });


    it('Open CLoud9', function (done) {
        client
            .url('http://172.22.194.48:8079/')

            .call(done);

    });

    it('Validate login fields', function (done) {
        client

            .isVisible("input[data-bind='value: userName']", function (err, username) {
                expect(err).to.be.null;
                expect(username).to.be.true
            })

            .isVisible("input[data-bind='value: password']", function (err, username) {
                expect(err).to.be.null;
                expect(username).to.be.true

            })

            .call(done);


    });

    it('Login to Cloud9', function (done) {
        client
            .buttonClick("button[data-bind='click: formLogin']", function (err, result) {
                expect(err).to.be.null;

            })
            .call(done);

    });


    it('View portal', function (done) {
        client
            .getTitle(function (err, title) {
                expect(err).to.be.null;
                //console.log(this.url.value);
                expect(title).to.equal('web app')

            })

            .getUrl('a custom variable', function (err, result) {
                assert.equal(null, err)
                assert.strictEqual(result.url, 'http://172.22.194.48:8079/#/home');

            })

            .call(done);
    });


});