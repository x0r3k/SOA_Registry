const router = require('express').Router();
const { getServiceInstance, createServiceInstance, updateServiceInstance, deleteServiceInstance } = require('../controllers/registry.controller');
const {
    param_Service_Code,
    body_Service_Code,
    body_Service_Name,
    body_Service_Description,
    body_Service_Url,
    body_Service_Port,
    body_Service_Status
} = require('../../services/apiValidations');

router.get(
    '/getServiceInstance',
    [
        param_Service_Code()
    ],
    getServiceInstance
);

router.post(
    '/createServiceInstance',
    [
        body_Service_Code(true),
        body_Service_Name(true),
        body_Service_Description(false),
        body_Service_Url(true),
        body_Service_Port(false),
        body_Service_Status(false)
    ],
    createServiceInstance
);

router.put(
    '/updateServiceInstance',
    [
        body_Service_Code(true),
        body_Service_Name(false),
        body_Service_Description(false),
        body_Service_Url(false),
        body_Service_Port(false),
        body_Service_Status(false)
    ],
    updateServiceInstance
);

router.delete(
    '/deleteServiceInstance',
    [
        body_Service_Code(true),
    ],
    deleteServiceInstance
);

module.exports = router;