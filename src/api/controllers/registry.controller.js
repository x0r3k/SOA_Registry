const createError = require('http-errors');
const { registry, sequelize, Sequelize } = require('../../sequelize/models');
const { validationResult } = require('express-validator');
const { formErrorObject, MAIN_ERROR_CODES } = require('../../services/errorHandling');
const Op = Sequelize.Op;

module.exports = {
    getServiceInstance: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }

            const { code } = req.query;

            // const serviceInstance = await registry.findOne({
            //     wher
            // });
            return res.status(200).json({ code });
        } 
        catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },
}