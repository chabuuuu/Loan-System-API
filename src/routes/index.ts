import BaseError from '../utils/BaseError';
const employeeRouter = require('./employee');
const mediaRouter = require('./media');
const siteRouter = require('./site');
const lenderRouter = require('./lender');
const borrowerRouter = require('./borrower');
const loanpackageRouter = require('./loanpackage');
function route(app: any) {
    app.use('/api/v1/employees', employeeRouter);
    app.use('/api/v1/media', mediaRouter);
    app.use('/api/v1/site', siteRouter);
    app.use('/api/v1/lender', lenderRouter);
    app.use('/api/v1/borrower', borrowerRouter);
    app.use('/api/v1/loanpackage', loanpackageRouter);
    app.all('*', (req: any, res: any, next: any) => {
        const status = 'fail';
        const statusCode = 404;
        const err = new BaseError(statusCode, status, 'Can not find this page');
        next(err);
    });
    app.use((error: BaseError, req: any, res: any, next: any) => {
        error.statusCode = error.statusCode || 500;
        error.status = error.status || 'error';
        console.log('This error' + error);
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    });
}
module.exports = route;
