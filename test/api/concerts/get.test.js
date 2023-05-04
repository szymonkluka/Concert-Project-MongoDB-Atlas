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
        const NODE_ENV = process.env.NODE_ENV;
        let dbUri;

        if (NODE_ENV === 'production') dbUri = 'mongodb+srv://szymonkluka:mongodatabase@cluster0.dr5p4rv.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
        else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDB';
        else dbUri = 'mongodb+srv://szymonkluka:mongodatabase@cluster0.dr5p4rv.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
        await mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

        const concertOne = new Concert({ performer: 'John Doe', genre: 'Rock', price: 25, day: 1, image: '/img/uploads/1fsd324fsdg.jpg' });
        await concertOne.save();

        const concertTwo = new Concert({ performer: 'Rebekah Parker', genre: 'R&B', price: 35, day: 1, image: '/img/uploads/2f342s4fsdg.jpg' });
        await concertTwo.save();

        const concertThree = new Concert({ performer: 'Maybell Haley', genre: 'Pop', price: 40, day: 1, image: '/img/uploads/hdfh42sd213.jpg' });
        await concertThree.save();
    });

    // after(async function () {
    //     await Concert.deleteMany({}, function (err) {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    // });

    describe('GET /concerts/performer1/:performer', () => {
        it('should return all concerts by performer', (done) => {
            const performerName = "John Doe";
            const res = request(app)
                .get(`/api/concerts/performer/${performerName}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body.length).to.be.equal(3);
                    done();
                });
        });
    });

    describe('GET /concerts/genre1/:genre', () => {
        it('should return all concerts by genre', async () => {
            const genre = "Rock";
            const res = await request(app)
                .get(`/concerts/genre/${genre}`);
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(3);
        });
    });

    describe('GET /concerts/day1/:day', () => {
        it('should return all concerts by day', async () => {
            const day = "1";
            const res = await request(app)
                .get(`/concerts/day/${day}`);
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equal(3);
        });
    })
});