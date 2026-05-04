const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { createToken, getAllTokens, getTokenById, updateToken, deleteToken } = require('../controllers/token.controller');

router.use(verifyToken); // protect all routes in /tokens

/**
 * @swagger
 * tags:
 *   name: Tokens
 *   description: Token-related endpoints (all require JWT)
 */

/**
 * @swagger
 * /tokens:
 *   post:
 *     summary: Create a new token (requires JWT)
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 example: RXhhbXBsZVRva2Vu
 *               creation_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-09-02T10:30:00Z
 *               expiration_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2026-09-02T10:30:00Z
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               service_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Token created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/', createToken);

/**
 * @swagger
 * /tokens:
 *   get:
 *     summary: Get all tokens (requires JWT)
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Token'
 */
router.get('/', getAllTokens);

/**
 * @swagger
 * /tokens/{id}:
 *   get:
 *     summary: Get token by ID (requires JWT)
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Token ID
 *     responses:
 *       200:
 *         description: Token found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       404:
 *         description: Token not found
 */
router.get('/:id', getTokenById);

/**
 * @swagger
 * /tokens/{id}:
 *   put:
 *     summary: Update a token by ID (requires JWT)
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Token ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Token'
 *     responses:
 *       200:
 *         description: Token updated successfully
 *       404:
 *         description: Token not found
 */
router.put('/:id', updateToken);

/**
 * @swagger
 * /tokens/{id}:
 *   delete:
 *     summary: Delete a token by ID (requires JWT)
 *     tags: [Tokens]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Token ID
 *     responses:
 *       204:
 *         description: Token deleted successfully
 *       404:
 *         description: Token not found
 */
router.delete('/:id', deleteToken);

module.exports = router;
