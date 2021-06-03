const PAYMENT_FREQUENCY = {
    WEEKLY: 'WEEKLY',
    FORTNIGHTLY: 'FORTNIGHTLY',
    MONTHLY: 'MONTHLY',
};

const MIN_DATE = new Date("2000-01-01");
const MAX_DATE = new Date("2099-12-31");

const DATE_PATTERN = /^\d{4}[-]\d{2}[-]\d{2}$/;
const MIN_RENT = 0;
const MAX_RENT = 999999999;


module.exports = {
    PAYMENT_FREQUENCY,
    MIN_DATE,
    MAX_DATE,
    DATE_PATTERN,
    MAX_RENT,
    MIN_RENT
}