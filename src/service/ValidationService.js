const { isAfter, isBefore } = require('date-fns');
const { PAYMENT_FREQUENCY } = require('../logic/Constants');
const ValidationService = {
    getLedger: (req, res, next) => {
        const { start_date, end_date, frequency, weekly_rent, timezone } = req.query;

        const minDate = new Date("2000-01-01");
        const maxDate = new Date("2099-12-31");

        let startDate = null;
        let endDate = null;

        let dateRegex = /^\d{4}[-]\d{2}[-]\d{2}$/

        let errors = [];

        if(!start_date) {
            errors.push('start_date not present');
        } else {
            if (start_date.match(dateRegex)) {
                startDate = new Date(start_date);
                if(isBefore(startDate, minDate) || isAfter(startDate, maxDate)) {
                    errors.push('start_date is not within the range');
                }
            } else {
                errors.push('start_date is not a valid ISO date')
            }
        }

        if(!end_date) {
            errors.push('end_date not present');
        } else {
            if(end_date.match(dateRegex)) {
                endDate = new Date(end_date);
                if(isBefore(endDate, minDate) || isAfter(endDate, maxDate)) {
                    errors.push('end_date is not within the range');
                } 
            } else {
                errors.push('end_date is not a valid ISO date')
            }
        }

        if(startDate && endDate && isBefore(endDate, startDate)) {
            errors.push('start_date should be before end_date');
        }

        if(!frequency) {
            errors.push('frequency not present');
        } else {
            if(!Object.values(PAYMENT_FREQUENCY).find(freq => freq === frequency)) {
                errors.push('frequency is not valid ')
            }
        }

        if(!weekly_rent) {
            errors.push('weekly_rent not present');
        } else {
            if (weekly_rent < 0 || weekly_rent > 999999999) {
                errors.push('weekly_rent is not within the range');
            }
        }

        if(!timezone) {
            errors.push('timezone not present')
        } else {
            if (Intl && Intl.DateTimeFormat().resolvedOptions().timeZone) {
                try {
                    Intl.DateTimeFormat(undefined, {timeZone: timezone});
                } catch (e) {
                    errors.push('timezone is not valid');
                }
            }
        }
        if (errors.length) {
            res.status(400);
            throw new Error(errors);
        }
        next();
    }
};

module.exports = {
    ValidationService,
};