
/**
 * Get terms of with it's lease amount
 * @requires terms Array of terms
 * @requires weeklyRent Rent per week
 * @returns Array of terms with associated rents
*/
const getTermsWithRent = (terms, weeklyRent) => terms.map(term => {
    let amount = weeklyRent / 7 * term.length;
    amount = Math.round(amount * 100) / 100;
    delete term.length;
    return { ...term, amount };
});

module.exports = {
    getTermsWithRent,
};
