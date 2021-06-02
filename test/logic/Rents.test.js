/* eslint-disable no-undef */
const { expect } = require('chai');
const { getTermsByWeeks, getTermsByMonths } = require('../../src/logic/Terms');
const { getTermsWithRent } = require('../../src/logic/Rents');

describe('getTermsWithRent', () => {
    it('Term with 1 day', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByWeeks(startDate, endDate);
        const termsWithRent = getTermsWithRent(terms, 350);
        expect(termsWithRent[0].amount).to.equal(50);
    });
    it('Term with 1 day with 349', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByWeeks(startDate, endDate);
        const termsWithRent = getTermsWithRent(terms, 349);
        expect(termsWithRent[0].amount).to.equal(49.86);
    });
    it('Term with more than 7 days', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-05-18');
        const terms = getTermsByWeeks(startDate, endDate);
        const termsWithRent = getTermsWithRent(terms, 418);
        expect(termsWithRent[0].amount).to.equal(418);
        expect(termsWithRent[5].amount).to.equal(418);
        expect(termsWithRent[termsWithRent.length - 1].amount).to.equal(59.71);
    });
    it('Term with 1 day, fortnightly', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByWeeks(startDate, endDate, true);
        const termsWithRent = getTermsWithRent(terms, 350);
        expect(termsWithRent[0].amount).to.equal(50);
    });
    it('Term with 1 day with 349, fortnightly', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByWeeks(startDate, endDate, true);
        const termsWithRent = getTermsWithRent(terms, 349);
        expect(termsWithRent[0].amount).to.equal(49.86);
    });
    it('Term with more than 7 days, fortnightly', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-05-18');
        const terms = getTermsByWeeks(startDate, endDate, true);
        const termsWithRent = getTermsWithRent(terms, 418);
        expect(termsWithRent[0].amount).to.equal(836);
        expect(termsWithRent[3].amount).to.equal(836);
        expect(termsWithRent[termsWithRent.length - 1].amount).to.equal(477.71);
    });
    it('Term with 1 day, monthly', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByMonths(startDate, endDate);
        const termsWithRent = getTermsWithRent(terms, 350);
        expect(termsWithRent[0].amount).to.equal(50);
    });
    it('Term with 1 day with 349, monthly', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2020-03-02');
        const terms = getTermsByMonths(startDate, endDate);
        const termsWithRent = getTermsWithRent(terms, 349);
        expect(termsWithRent[0].amount).to.equal(49.86);
    });
    it('Term with more than 7 days, monthly', () => {
        const startDate = new Date('2020-03-02');
        const endDate = new Date('2021-05-18');
        const terms = getTermsByMonths(startDate, endDate);
        const termsWithRent = getTermsWithRent(terms, 418);
        expect(termsWithRent[0].amount).to.equal(1816.31);
        expect(termsWithRent[1].amount).to.equal(1816.31);
        expect(termsWithRent[termsWithRent.length - 1].amount).to.equal(1015.14);
    });
    it('Term with more than 7 days, term starting on month end, monthly', () => {
        const startDate = new Date('2020-01-31');
        const endDate = new Date('2021-05-18');
        const terms = getTermsByMonths(startDate, endDate);
        const termsWithRent = getTermsWithRent(terms, 418);
        expect(termsWithRent[0].amount).to.equal(1816.31);
        expect(termsWithRent[1].amount).to.equal(1816.31);
        expect(termsWithRent[termsWithRent.length - 1].amount).to.equal(1134.57);
    });
});