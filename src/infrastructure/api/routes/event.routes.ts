import { Router } from "express";

import {
  createEventController,
  updateEventController,
  deleteEventController,
  getEventByIdController,
  getEventsByKitchenController,
} from "../dependencies/dependencies";

import { authMiddleware } from "../../../middleware/auth.middleware";
import { requireRole } from "../../../middleware/role.middleware";

const router = Router();

router.post(
  "/",
  authMiddleware,
  requireRole("Admin_cocina"),
  (req, res) => createEventController.handle(req, res)
);

router.put(
  "/:id",
  authMiddleware,
  requireRole("Admin_cocina"),
  (req, res) => updateEventController.handle(req, res)
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("Admin_cocina"),
  (req, res) => deleteEventController.handle(req, res)
);

router.get(
  "/:id",
  authMiddleware,
  (req, res) => getEventByIdController.handle(req, res)
);

router.get(
  "/kitchen/:kitchenId",
  authMiddleware,
  (req, res) => getEventsByKitchenController.handle(req, res)
);

export default router;
