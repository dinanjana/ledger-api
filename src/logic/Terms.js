const { add, sub, isAfter, differenceInDays, isEqual } = require('date-fns');

/**
 * Get lease period in terms of weeks or 2 weeks
 * @requires nextTermStartDate Start date of lease period
 * @requires endDate End date of lease period
 * @returns Array of terms
*/
const getTermsByWeeks = (nextTermStartDate, endDate, fortnightly, terms = []) => {
    let term = fortnightly && 13 || 6;
    const termEndDate = add(nextTermStartDate, { days: term });
    if (isAfter(termEndDate, endDate) || isEqual(termEndDate, endDate)) {
        return getFinalTerm(nextTermStartDate, endDate, terms);
    }
    terms.push({ start_date: nextTermStartDate, end_date: termEndDate, length: term + 1 })
    return getTermsByWeeks(add(termEndDate, { days: 1 }), endDate, fortnightly, terms);
};

/**
 * Get lease period in terms of months
 * @requires startDate Start date of lease period
 * @requires endDate End date of lease period
 * @returns Array of terms
*/
const getTermsByMonths = (startDate, endDate, terms=[], nextTermStartDate, numberOfMonths=1) => {
    const termEndDate = sub(add(startDate, { months: numberOfMonths }), { days: 1 });
    const termStartDate = nextTermStartDate || startDate;
    if (isAfter(termEndDate, endDate) || isEqual(termEndDate, endDate)) {
        return getFinalTerm(termStartDate, endDate, terms);
    }
    terms.push({ start_date: termStartDate, end_date: termEndDate, length: 365/12 })
    return getTermsByMonths(startDate, endDate, terms, add(termEndDate, { days: 1 }), ++numberOfMonths);
}

const getFinalTerm = (termStartDate, endDate, terms) => {
    terms.push({ 
        start_date:  termStartDate,
        end_date: endDate, length: differenceInDays(endDate, termStartDate) + 1 });
    return terms;
} 

module.exports = {
    getTermsByWeeks,
    getTermsByMonths
}

