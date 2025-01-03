const Manufacturer = require('../models/manufacturer.m.js');

module.exports = {
    getManufacturers: async (req, res) => {
        try {
            const { page_size, current_page } = req.query;
            const filters = {
                page_size: page_size ? parseInt(page_size) : null,
                current_page: current_page ? parseInt(current_page) : 1
            };
            const result = await Manufacturer.getManufacturers(filters);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send('An error occurred while fetching manufacturers');
        }
    },

    getManufacturerDetail: async (req, res) => {
        try {
            const manufacturerId = parseInt(req.params.id);
            if (isNaN(manufacturerId)) {
                return res.status(400).json({ error: 'Invalid manufacturer ID' });
            }
            const manufacturer = await Manufacturer.getManufacturerById(manufacturerId);
            if (!manufacturer) {
                res.status(404).json({ error: `Manufacturer with id ${manufacturerId} not found` });
                return;
            }
            res.status(200).json(manufacturer);
        } catch (error) {
            res.status(500).send('An error occurred while fetching manufacturer details');
        }
    },

    createManufacturer: async (req, res) => {
        try {
            const { name } = req.body;
            const manufacturer = { name };
            const newManufacturerId = await Manufacturer.createManufacturer(manufacturer);
            res.status(201).json({ manufacturer_id: newManufacturerId });
        } catch (error) {
            res.status(500).send('An error occurred while creating manufacturer');
        }
    },

    updateManufacturer: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { name } = req.body;
            const manufacturer = { name };
            const updatedManufacturerId = await Manufacturer.updateManufacturer(id, manufacturer);
            res.status(200).json({ manufacturer_id: updatedManufacturerId });
        } catch (error) {
            res.status(500).send('An error occurred while updating manufacturer');
        }    
    },

    deleteManufacturer: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await Manufacturer.deleteManufacturer(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).send('An error occurred while deleting manufacturer');
        }
    }

};