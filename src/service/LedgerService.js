const { PAYMENT_FREQUENCY } = require('../logic/Constants');
const { getTermsWithRent } = require('../logic/Rents');
const { getTermsByMonths, getTermsByWeeks } = require('../logic/Terms');

const getLedger = ({ start_date, end_date, frequency, weekly_rent }) => {
    let terms = [];
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    switch(frequency) {
        case PAYMENT_FREQUENCY.MONTHLY: {
            terms = getTermsByMonths(startDate, endDate);
            break;
        }
        case PAYMENT_FREQUENCY.FORTNIGHTLY: {
            terms = getTermsByWeeks(startDate, endDate, true);
            break;
        } 
        default: {
            terms = getTermsByWeeks(startDate, endDate);
            break;
        }
    }
    return getTermsWithRent(terms, weekly_rent);
};

module.exports = {
    getLedger,
};