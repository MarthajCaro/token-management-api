const Service = require('../models/service.model');

// Create a new service
const createService = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Simple validations
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required.' });
    }

    // Create in the database
    const newService = await Service.create({ name, description });
    res.status(201).json(newService);

  } catch (error) {
    console.error('Error creating the service:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json({ services });
  } catch (error) {
    console.error('Error while getting services:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtain a service by ID
const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(service);
} catch (error) {
    console.error('Error while getting services:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a service by ID
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

// Update fields
    service.name = name || service.name;
    service.description = description || service.description;

    await service.save();

    res.status(200).json(service);
  } catch (error) {
    console.error('Error while getting services:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a service by ID
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.destroy();

    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createService, getServices, getServiceById, updateService, deleteService};