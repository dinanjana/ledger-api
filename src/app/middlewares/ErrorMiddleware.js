/* eslint-disable no-unused-vars */
/**
 * Common error handler
*/
const ErrorMiddleware = (err, req, res, next) => {
    res.send({ msg: err.message });
};
  
module.exports = {
    ErrorMiddleware,
};
