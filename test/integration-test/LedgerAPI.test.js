/* eslint-disable no-undef */
const request = require('supertest');
const { init } = require('../../src/app');

const app = init();

describe('Query string validations', (done) => {
    it('Empty query string', () => {
        request(app)
        .get('/ledger')
        .expect(400, {  msg: 'start_date not present,end_date not present,frequency not present,weekly_rent not present,timezone not present'}, done);
    });
    it('query string with start_date', (done) => {
        request(app)
        .get('/ledger?start_date=2020-01-02')
        .expect(400, { msg: 'end_date not present,frequency not present,weekly_rent not present,timezone not present' }, done);
    });
    it('query string with start_date, end_date', (done) => {
        request(app)
        .get('/ledger?start_date=2020-01-02&end_date=2021-05-18')
        .expect(400, { msg: 'frequency not present,weekly_rent not present,timezone not present' }, done);
    });
    it('query string with start_date, end_date, frequency', (done) => {
        request(app)
        .get('/ledger?start_date=2020-01-02&end_date=2021-05-18&frequency=WEEKLY')
        .expect(400, { msg: 'weekly_rent not present,timezone not present' }, done);
    });
    it('query string with start_date, end_date, frequency, weekly_rent', (done) => {
        request(app)
        .get('/ledger?start_date=2020-01-02&end_date=2021-05-18&frequency=WEEKLY&weekly_rent=324')
        .expect(400, { msg: 'timezone not present' }, done);
    });
    it('start_date not in ISO format', (done) => {
        request(app)
        .get('/ledger?start_date=02-01-02&end_date=2021-05-18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'start_date is not a valid ISO date' }, done);
    });
    it('end_date not in ISO format', (done) => {
        request(app)
        .get('/ledger?start_date=2021-01-02&end_date=2021/05/18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'end_date is not a valid ISO date' }, done);
    });
    it('start_date > end_Date', (done) => {
        request(app)
        .get('/ledger?start_date=2021-06-02&end_date=2021-05-18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'start_date should be before end_date' }, done);
    });
    it('start_date = end_date', (done) => {
        request(app)
        .get('/ledger?start_date=2021-06-02&end_date=2021-06-02&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(200, [ { start_date: '2021-06-02T00:00:00.000Z',
        end_date: '2021-06-02T00:00:00.000Z',
        amount: 46.29 } ], done);
    });
    it('start_date not in range', (done) => {
        request(app)
        .get('/ledger?start_date=1900-06-02&end_date=2021-05-18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'start_date is not within the range' }, done);
    });
    it('start_date not in range', (done) => {
        request(app)
        .get('/ledger?start_date=2100-06-02&end_date=2021-05-18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'start_date is not within the range,start_date should be before end_date' }, done);
    });
    it('end_date not in range', (done) => {
        request(app)
        .get('/ledger?start_date=2000-06-02&end_date=1900-05-18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'end_date is not within the range,start_date should be before end_date' }, done);
    });
    it('end_date not in range', (done) => {
        request(app)
        .get('/ledger?start_date=2020-06-02&end_date=2121-05-18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'end_date is not within the range' }, done);
    });
    it('frequency not valid', (done) => {
        request(app)
        .get('/ledger?start_date=2021-06-02&end_date=2021-06-02&frequency=DAILY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(400, { msg: 'frequency is not valid ' }, done);
    });
    it('weekly_rent not within the range', (done) => {
        request(app)
        .get('/ledger?start_date=2021-06-02&end_date=2021-06-02&frequency=WEEKLY&weekly_rent=-324&timezone=Asia/Colombo')
        .expect(400, { msg: 'weekly_rent is not within the range' }, done);
    });
    it('weekly_rent not within the range', (done) => {
        request(app)
        .get('/ledger?start_date=2021-06-02&end_date=2021-06-02&frequency=WEEKLY&weekly_rent=9999999999&timezone=Asia/Colombo')
        .expect(400, { msg: 'weekly_rent is not within the range' }, done);
    });
    it('timezone not valid', (done) => {
        request(app)
        .get('/ledger?end_date=2021-06-02&frequency=WEEKLY&weekly_rent=99999999&timezone=Asia/Colombo')
        .expect(400, { msg: 'start_date not present' }, done);
    });
    it('timezone not valid', (done) => {
        request(app)
        .get('/ledger?start_date=2021-06-02&end_date=2021-06-02&frequency=WEEKLY&weekly_rent=99999999&timezone=Asia')
        .expect(400, { msg: 'timezone is not valid' }, done);
    });
    it('query string with start_date, end_date, frequency, weekly_rent, timezone', (done) => {
        request(app)
        .get('/ledger?start_date=2020-01-02&end_date=2020-03-18&frequency=WEEKLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(200, [ 
      { start_date: '2020-01-02T00:00:00.000Z',
        end_date: '2020-01-08T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-01-09T00:00:00.000Z',
        end_date: '2020-01-15T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-01-16T00:00:00.000Z',
        end_date: '2020-01-22T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-01-23T00:00:00.000Z',
        end_date: '2020-01-29T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-01-30T00:00:00.000Z',
        end_date: '2020-02-05T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-02-06T00:00:00.000Z',
        end_date: '2020-02-12T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-02-13T00:00:00.000Z',
        end_date: '2020-02-19T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-02-20T00:00:00.000Z',
        end_date: '2020-02-26T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-02-27T00:00:00.000Z',
        end_date: '2020-03-04T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-03-05T00:00:00.000Z',
        end_date: '2020-03-11T00:00:00.000Z',
        amount: 324 },
      { start_date: '2020-03-12T00:00:00.000Z',
        end_date: '2020-03-18T00:00:00.000Z',
        amount: 324 },
     ], done);
    });
    it('query string with start_date, end_date, frequency, weekly_rent, timezone', (done) => {
        request(app)
        .get('/ledger?start_date=2020-01-02&end_date=2020-03-18&frequency=MONTHLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(200, [ { start_date: '2020-01-02T00:00:00.000Z',
        end_date: '2020-02-01T00:00:00.000Z',
        amount: 1407.86 },
      { start_date: '2020-02-02T00:00:00.000Z',
        end_date: '2020-03-01T00:00:00.000Z',
        amount: 1407.86 },
      { start_date: '2020-03-02T00:00:00.000Z',
        end_date: '2020-03-18T00:00:00.000Z',
        amount: 786.86 } ], done);
    });
    it('query string with start_date, end_date, frequency, weekly_rent, timezone', (done) => {
        request(app)
        .get('/ledger?start_date=2020-01-02&end_date=2020-03-18&frequency=FORTNIGHTLY&weekly_rent=324&timezone=Asia/Colombo')
        .expect(200, [ { start_date: '2020-01-02T00:00:00.000Z',
        end_date: '2020-01-15T00:00:00.000Z',
        amount: 648 },
      { start_date: '2020-01-16T00:00:00.000Z',
        end_date: '2020-01-29T00:00:00.000Z',
        amount: 648 },
      { start_date: '2020-01-30T00:00:00.000Z',
        end_date: '2020-02-12T00:00:00.000Z',
        amount: 648 },
      { start_date: '2020-02-13T00:00:00.000Z',
        end_date: '2020-02-26T00:00:00.000Z',
        amount: 648 },
      { start_date: '2020-02-27T00:00:00.000Z',
        end_date: '2020-03-11T00:00:00.000Z',
        amount: 648 },
      { start_date: '2020-03-12T00:00:00.000Z',
        end_date: '2020-03-18T00:00:00.000Z',
        amount: 324 } ], done);
    });
});