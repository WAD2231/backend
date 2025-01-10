const express = require('express');
const router = express.Router();
const manufacturerController = require('../controllers/manufacturer.c.js');

// Route to get manufacturers with optional pagination
router.get('/', manufacturerController.getManufacturers);

// Route to get manufacturer details by ID
router.get('/:id', manufacturerController.getManufacturerDetail);

// Route to delete a manufacturer by ID
router.delete('/:id', manufacturerController.deleteManufacturer);

module.exports = router;