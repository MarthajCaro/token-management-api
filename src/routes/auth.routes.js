const express = require('express');
const router = express.Router();

const { createToken, login } = require('../controllers/auth.controller');

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Create a new token (client credentials grant)
 *     description: >
 *       Machine-to-machine grant. Meant for Postman or other backend services,
 *       not for the browser: the client_secret must never be shipped to a
 *       frontend. The web app uses /auth/login instead.
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
router.post("/token", createToken);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in with email and password
 *     description: >
 *       Verifies the credentials on the server and returns a JWT for the user.
 *       The password is never included in the response.
 *     tags: [AuthenticationToken]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: martha@coro.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 token_type:
 *                   type: string
 *                   example: Bearer
 *                 expires_in:
 *                   type: integer
 *                   example: 300
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: Martha Caro
 *                     email:
 *                       type: string
 *                       example: martha@coro.com
 *                     role:
 *                       type: string
 *                       enum: [admin, editor, reader]
 *                       example: admin
 *       400:
 *         description: email and password are required
 *       401:
 *         description: Incorrect email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", login);

module.exports = router;