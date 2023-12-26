import { Router } from "express";
import SetsController from "../controllers/sets.controller";

const setsRoutes = Router();
const controller = new SetsController();

/**
 * @swagger
 * /sets/{id}/new-item:
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
setsRoutes.post("/:id/new-item", (req, res) => controller.addItemToSet(req, res));

export default setsRoutes;
