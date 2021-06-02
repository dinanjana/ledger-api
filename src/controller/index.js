const LedgerService = require('../service/LedgerService');
const { ValidationService } = require('../service/ValidationService');

const controllers = [{
    path: '/ledger',
    method: 'get',
    handlers: [ValidationService.getLedger, (req, res) => {
        console.log(`${process.pid} handling the request`);
        const terms = LedgerService.getLedger(req.query);
        res.status(200);
        res.send(terms);
    }]
}];

module.exports = {
    controllers
}