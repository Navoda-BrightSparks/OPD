/**
 * Created by ICTMO15-95 on 30-Jun-17.
 */
var request = require('supertest');
var should = require('should');
var mocha = require('mocha');
var app = require('../server.js');

const agent = request.agent(app);

var patient =
    {
    title : "Baby",
    firstName : "djkr",
    Gender : "Male",
    civilStatus : "single",
    Address : "bbbkjmlbb",
    Alergies : []
}






    describe("SAMPLE unit test",function(){
    it("should get all patients",function(done){
        //calling ADD api
        agent
            .get('/patients')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });

    it("should get for a patient",function(done){

        agent
            .get('/patients/591155c5d86f4c1ea0383d0e')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Object();
                done();
            });
    });

    it("should get patient by HIN",function(done){

        agent
            .get('/patients?1494308293051')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Object();
                done();
            });
    });


    it("should get visit for a patient",function(done){

        agent
            .get('/patients?1494308332261')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Object();
                done();
            });
    });

   /* it("should get alergy for a patient",function(done){

        agent
            .get('/patients/Alergies?591155c5d86f4c1ea0383d0e')
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                res.body.should.be.an.Array();
                done();
            });
    });
*/
    it('should add new patient', (done) => {
        agent
            .post('/patients')
            .send(patient)
            .expect(201)
            .end(function (err, res) {
                patientId = res.body._id;
                res.body.should.be.an.Object().and.have.property('_id');
                done();
            });
    });





});