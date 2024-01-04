import { Router } from "express";
import SetsController from "../controllers/sets.controller";

const setsRoutes = Router();
const controller = new SetsController();

/**
 * @swagger
 * /sets/{id}/items:
 *   post:
 *     summary: Adds new item to set
 *     description: Creates and adds new item to set
 *     tags:
 *       - Sets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the set
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               details:
 *                 type: Exercise
 *               repMin:
 *                 type: number
 *               repMax:
 *                 type: number
 *               repExact:
 *                 type: number
 *               repType:
 *                 type: string
 *               sort:
 *                 type: number
 *               rest:
 *                 type: number
 *     responses:
 *       201:
 *         description: Set updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
setsRoutes.post("/:id/items", (req, res) => controller.addItemToSet(req, res));

/**
 * @swagger
 * /sets/{id}:
 *   put:
 *     summary: Update a set
 *     description: This endpoint updates a set with the given ID
 *     tags:
 *       - Sets
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the set to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *                 optional: true
 *     responses:
 *       '200':
 *         description: The set was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Set'
 *       '400':
 *         description: Bad request, ID not provided or invalid data
 *       '404':
 *         description: Set not found
 *       '500':
 *         description: Internal server error
 */
setsRoutes.put("/:id", (req, res) => controller.updateSet(req, res));

export default setsRoutes;
