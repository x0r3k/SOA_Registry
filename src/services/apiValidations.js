const { query, param, body, check } = require('express-validator');
const { SERVICE_STATUSES } = require('../helpers/constants');

const isRequiredParameter = (isRequired, paramName) => {
    return isRequired ? check(paramName).exists().withMessage('Is required').bail() : check(paramName).optional();
}

module.exports = {
    param_Service_Code: () => {
        return query('code').exists().withMessage('Is required').bail()
        .notEmpty().withMessage('Should not be empty').bail()
        .isString().withMessage('Should be string');    
    },
    body_Service_Code: (isRequired) => {
      return isRequiredParameter(isRequired, 'code').notEmpty().withMessage('Should not be empty').bail()
        .isString().withMessage('Should be string');
    },
    body_Service_Name: (isRequired) => {
        return isRequiredParameter(isRequired, 'name').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string').isLength({max: 200}).withMessage('Max length is 200 symbols');
    },
    body_Service_Description: (isRequired) => {
        return isRequiredParameter(isRequired, 'desscription').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string');
    },
    body_Service_Url: (isRequired) => {
        return isRequiredParameter(isRequired, 'url').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string').isLength({max: 200}).withMessage('Max length is 200 symbols');
    },
    body_Service_Port: (isRequired) => {
        return isRequiredParameter(isRequired, 'port').notEmpty().withMessage('Should not be empty').bail()
          .isInt().withMessage('Should be number').bail().isInt({max: 65535}).withMessage('Max value is 65535').bail()
          .isInt({min: 1025}).withMessage('Min value is 1025').bail()
    },
    body_Service_Status: (isRequired) => {
        return isRequiredParameter(isRequired, 'status').notEmpty().withMessage('Should not be empty').bail()
          .isIn(SERVICE_STATUSES).withMessage(`Allowed values: ${SERVICE_STATUSES}`);
    }
}