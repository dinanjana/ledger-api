/* eslint-disable no-undef */
const { expect } = require('chai');
const { formatISO } = require('date-fns');
const { getTermsByWeeks, getTermsByMonths } = require('../../src/logic/Terms');

describe('getTermsByWeeks', () => {
    it('Weekly terms: 2020-03-02 -> 2020-03-02', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByWeeks(startDate, endDate);
        expect(terms[terms.length -1].length).to.equal(1);
        expect(terms.length).to.equal(1);
        expect(formatISO(terms[0].start_date, { representation: 'date' })).to.equal('2020-03-02');
        expect(formatISO(terms[0].end_date, { representation: 'date' })).to.equal('2020-03-02');
    });
    it('Weekly terms: 2020-03-03 -> 2020-03-02', () => {
        const startDate = new Date('2020-03-03');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByWeeks(startDate, endDate);
        expect(terms[terms.length -1].length).to.equal(0);
        expect(terms.length).to.equal(1);
    });
    it('Weekly terms: 2020-03-02 -> 2020-05-18', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-05-18');
        const terms = getTermsByWeeks(startDate, endDate);
        expect(terms[terms.length -1].length).to.equal(1);
        expect(terms.length).to.equal(12);
        expect(formatISO(terms[0].start_date, { representation: 'date' })).to.equal('2020-03-02');
        expect(formatISO(terms[0].end_date, { representation: 'date' })).to.equal('2020-03-08');
        expect(formatISO(terms[terms.length - 1].start_date, { representation: 'date' })).to.equal('2020-05-18');
        expect(formatISO(terms[terms.length - 1].end_date, { representation: 'date' })).to.equal('2020-05-18');
    });
    it('Fortnightly terms: 2020-03-02 -> 2020-05-18', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-05-18');
        const terms = getTermsByWeeks(startDate, endDate, true);
        expect(terms[terms.length -1].length).to.equal(8);
        expect(terms.length).to.equal(6);
    });
    it('Weekly terms: 2020-01-31 -> 2020-02-29', () => {
        const startDate = new Date('2020-01-31');
        const endDate = new Date('2020-02-29');
        const terms = getTermsByWeeks(startDate, endDate);
        expect(terms[terms.length -1].length).to.equal(2);
        expect(terms.length).to.equal(5);
        expect(formatISO(terms[0].start_date, { representation: 'date' })).to.equal('2020-01-31');
        expect(formatISO(terms[0].end_date, { representation: 'date' })).to.equal('2020-02-06');
        expect(formatISO(terms[terms.length - 1].start_date, { representation: 'date' })).to.equal('2020-02-28');
        expect(formatISO(terms[terms.length - 1].end_date, { representation: 'date' })).to.equal('2020-02-29');
    });
    it('Weekly terms: 2020-03-03 -> 2020-03-18', () => {
        const startDate = new Date('2020-01-02');
        const endDate = new Date('2020-03-18');
        const terms = getTermsByWeeks(startDate, endDate);
        expect(terms[terms.length -1].length).to.equal(7);
        expect(terms.length).to.equal(11);
    });
});

describe('getTermsByMonths', () => {
    it('Monthly terms: 2020-03-02 -> 2020-03-02', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByMonths(startDate, endDate);
        expect(terms[terms.length -1].length).to.equal(1);
        expect(terms.length).to.equal(1);
        expect(formatISO(terms[0].start_date, { representation: 'date' })).to.equal('2020-03-02');
        expect(formatISO(terms[0].end_date, { representation: 'date' })).to.equal('2020-03-02');
    });
    it('Monthly terms: 2020-03-02 -> 2020-05-18', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-05-18');
        const terms = getTermsByMonths(startDate, endDate);
        expect(terms[terms.length -1].length).to.equal(17);
        expect(terms.length).to.equal(3);
        expect(formatISO(terms[0].start_date, { representation: 'date' })).to.equal('2020-03-02');
        expect(formatISO(terms[0].end_date, { representation: 'date' })).to.equal('2020-04-01');
        expect(formatISO(terms[terms.length - 1].start_date, { representation: 'date' })).to.equal('2020-05-02');
        expect(formatISO(terms[terms.length - 1].end_date, { representation: 'date' })).to.equal('2020-05-18');
    });
    it('Weekly terms: 2020-01-31 -> 2021-03-01', () => {
        const startDate = new Date('2020-01-31');
        const endDate = new Date('2021-03-01');
        const terms = getTermsByMonths(startDate, endDate);
        expect(terms.length).to.equal(14);
        expect(formatISO(terms[0].start_date, { representation: 'date' })).to.equal('2020-01-31');
        expect(formatISO(terms[0].end_date, { representation: 'date' })).to.equal('2020-02-28');
        expect(formatISO(terms[1].start_date, { representation: 'date' })).to.equal('2020-02-29');
        expect(formatISO(terms[1].end_date, { representation: 'date' })).to.equal('2020-03-30');
        expect(terms[terms.length -1].length).to.equal(2);
        expect(formatISO(terms[terms.length - 1].start_date, { representation: 'date' })).to.equal('2021-02-28');
        expect(formatISO(terms[terms.length - 1].end_date, { representation: 'date' })).to.equal('2021-03-01');
    });

});
