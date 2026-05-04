const express = require('express');
const router = express.Router();

const { createToken } = require('../controllers/auth.controller');

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Create a new token
 *     tags: [AuthenticationToken]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - client_secret
 *             properties:
 *               client_id:
 *                 type: string
 *                 example: client_example_01
 *               client_secret:
 *                 type: string
 *                 example: 00000000-0000-0000-0000-000000000000
 *     responses:
 *       201:
 *         access_token: Valid acces token,
 *         token_type: Bearer,
 *         expires_in: 300
 *       400:
 *         error: Validation error
 *       500:
 *         error: Internal server error
 */
router.post("/", createToken);

module.exports = router;