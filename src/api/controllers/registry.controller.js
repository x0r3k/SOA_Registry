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
            const serviceInstance = await registry.findOne({
                where: {
                    code
                }
            });
            if(!serviceInstance) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Service not found')));

            return res.status(200).json({ serviceInstance });
        } 
        catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    createServiceInstance: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { code, name, description, url, port, status } = req.body;
            const serviceInstance = await registry.upsert({
                code, 
                name,
                description,
                url,
                port,
                status: status || 'on'
            }, {
                where: {
                    code
                }
            });

            return res.status(200).json({ message: "Service created/recreated" });
        } 
        catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    updateServiceInstance: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { code, name, description, url, port, status } = req.body;

            const foundedService = await registry.findOne({
                where: {code}
            });
            if(!foundedService) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Service not found')));


            await registry.update({
                name,
                description,
                url,
                port,
                status
            }, {
                where: {
                    code
                }
            });

            return res.status(200).json({ message: "Service updated" });
        } 
        catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    deleteServiceInstance: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const { code, name, description, url, port, status } = req.body;

            const foundedService = await registry.findOne({
                where: {code}
            });
            if(!foundedService) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Service not found')));

            await registry.destroy({
                where: {
                    code
                }
            });

            return res.status(200).json({ message: "Service deleted" });
        } 
        catch (error) {
            console.log(error);
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },
}