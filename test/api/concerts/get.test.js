const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Concert = require('../../../models/concert.model');
chai.use(chaiHttp);
const server = require('../../../server.js');

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts/performer/:performer', () => {
    before(async () => {
        const NODE_ENV = process.env.NODE_ENV;
        let dbUri;

        if (NODE_ENV === 'production') dbUri = 'mongodb+srv://szymonkluka:mongodatabase@cluster0.dr5p4rv.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
        else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDB';
        else dbUri = 'mongodb+srv://szymonkluka:mongodatabase@cluster0.dr5p4rv.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })

        const concertOne = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
        await concertOne.save();

        const concertTwo = new Concert({ performer: 'Rebekah Parker', genre: 'R&B', price: 35, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
        await concertTwo.save();

        const concertThree = new Concert({ performer: 'Maybell Haley', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/hdfh42sd213.jpg' });
        await concertThree.save();
    });

    after(async () => {
        await Concert.deleteMany();
    })

    it('/ should return all concerts by performer', (done) => {
        const performerName = "John Doe"
        request(server)
            .get(`/api/concerts/performer/${performerName}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(1);
                done();
            });
    });
    it('/ should return all concerts by genre', (done) => {
        const genre = "Rock"
        request(server)
            .get(`/api/concerts/genre/${genre}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(1);
                done();
            });
    });
    it('/ should return all concerts by day', (done) => {
        const day = "1"
        request(server)
            .get(`/api/concerts/day/${day}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(3);
                done();
            });
    });
    it('should return all concerts by price range', (done) => {
        const priceMin = 20;
        const priceMax = 40;
        request(server)
            .get(`/api/concerts/price/${priceMin}/${priceMax}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(3);
                done();
            });
    });

});