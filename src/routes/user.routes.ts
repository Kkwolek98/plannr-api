import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router();
const controller = new UserController();

/**
 * @swagger
 * /details:
 *   get:
 *     summary: Get current user details
 *     description: Retrieves the details of the currently authenticated user.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       401:
 *         description: Unauthorized, user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User details not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRoutes.get("/details", (req, res) => controller.getCurrentUserDetails(req, res));

/**
 * @swagger
 * /details:
 *   put:
 *     summary: Update current user details
 *     description: Updates the details of the currently authenticated user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserDetails'
 *     responses:
 *       200:
 *         description: Successfully updated user details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       401:
 *         description: Unauthorized, user is not authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
userRoutes.put("/details", (req, res) => controller.updateCurrentUserDetails(req, res));

export default userRoutes;

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetails:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         birthDate:
 *           type: string
 *           format: date
 *           example: 1990-01-01
 *         weight:
 *           type: number
 *           example: 70.5
 *         height:
 *           type: number
 *           example: 175.3
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Unauthorized"
 */
