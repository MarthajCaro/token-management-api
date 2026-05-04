const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/user.controller');

router.use(verifyToken); // protects all routes in/user
/**
* @swagger
* /users:
*   post:
*     summary: create new users (requires JWT)
*     tags: [Users]
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
*               - email
*               - role
*             properties:
*               name:
*                 type: string
*                 example: Juan Pérez
*               email:
*                 type: string
*                 format: email
*                 example: juan@example.com
*               password:
*                 type: string
*                 format: password
*                 example: 123456
*               role:
*                 type: string
*                 enum: [admin, editor, reader]
*                 example: reader
*     responses:
*       201:
*         description: User created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   example: 1
*                 name:
*                   type: string
*                   example: Juan Pérez
*                 email:
*                   type: string
*                   example: juan@example.com
*                 role:
*                   type: string
*                   example: reader
*       400:
*         description: Internal Server Error
*/ 
router.post('/', createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (requires JWT)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter users by role
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Juan Pérez
 *                   email:
 *                     type: string
 *                     example: juan@example.com
 *                   role:
 *                     type: string
 *                     example: reader
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID (requires JWT)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               role:
 *                 type: string
 *                 enum: [admin, editor, reader]
 *                 example: editor
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad Request - Missing fields
 *       404:
 *         description: User not found
 *       409:
 *         description: Conflict - Email already registered
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID (requires JWT)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', deleteUser);

module.exports = router;
