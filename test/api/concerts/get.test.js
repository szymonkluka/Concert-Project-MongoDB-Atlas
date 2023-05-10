const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Concert = require('../../../models/concert.model');
const app = require('../../../server');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('Test Concert Endpoints', () => {
    beforeEach(async function () {

        process.env.NODE_ENV = 'test';
        const dbUri = 'mongodb://localhost:27017/NewWaveDB';
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
        await Concert.deleteMany({});

        const concertOne = new Concert({
            performer: 'John Doe',
            genre: 'RocknRoll',
            price: 25,
            day: 1,
            image: '/img/uploads/1fsd324fsdg.jpg',
        });
        await concertOne.save();

        const concertTwo = new Concert({
            performer: 'Rebekah Parker',
            genre: 'R&B',
            price: 35,
            day: 1,
            image: '/img/uploads/2f342s4fsdg.jpg',
        });
        await concertTwo.save();

        const concertThree = new Concert({
            performer: 'Maybell Haley',
            genre: 'Pop',
            price: 40,
            day: 1,
            image: '/img/uploads/hdfh42sd213.jpg',
        });
        await concertThree.save();
    });


    describe('GET /api/concerts/performer/:performer', () => {
        it('should return all concerts by performer', (done) => {
            const performerName = 'John Doe';
            const res = request(app).get(`/api/concerts/performer/${performerName}`).end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.be.equal(1);
                done();
            });
        });
    });

    describe('GET /api/concerts/genre/:genre', () => {
        it('should return all concerts by genre', async () => {
            const genre = 'RocknRoll';
            const res = await request(app)
                .get(`/api/concerts/genre/${genre}`);
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(1);
        });
    });
    describe('GET/api/concerts/day:/day', () => {
        it('should return all concerts by day', async () => {
            const day = '1';
            const res = await request(app).get(`/api/concerts/day/${day}`);
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(3)
        })
    })
    describe('GET/api/concerts/price/:priceMin/:priceMax', () => {
        it('should return all concerts by price', async () => {
            const priceMin = '35';
            const priceMax = '40';
            const res = await request(app).get(`/api/concerts/price/${priceMin}/${priceMax}`);
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(2); // update the expected length based on the number of concerts that fall within the price range
        })
    })
});
