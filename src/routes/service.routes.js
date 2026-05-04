const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { createService, getServices, getServiceById, updateService, deleteService} = require('../controllers/service.controller');

router.use(verifyToken); // protect all routes in /services

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service (requires JWT)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: API Polarion
 *               description:
 *                 type: string
 *                 example: Web service exposed for Polarion.
 *     responses:
 *       201:
 *         description: Service successfully created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", createService);

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services (requires JWT)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of services
 */
router.get("/", getServices);

/**
 * @swagger
 *  /services/{id}:
 *   get:
 *     summary: Get a service by ID (requires JWT)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service found
 *       404:
 *         description: Service not found
 */
router.get("/:id", getServiceById);

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Update a service by ID (requires JWT)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the service to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New name
 *               description:
 *                 type: string
 *                 example: New description
 *     responses:
 *       200:
 *         description: Updated service
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateService);

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete a service by ID (requires JWT)
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the service to be deleted
 *     responses:
 *       204:
 *         description: Service successfully deleted
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteService);


module.exports = router;
