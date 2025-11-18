import { Router } from "express";

import {
  subscribeToKitchenController,
  unsubscribeFromKitchenController,
  getKitchenSubscriptionsController,
} from "../dependencies/dependencies";

import { authMiddleware } from "../../../middleware/auth.middleware";
import { requireRole } from "../../../middleware/role.middleware";

const router = Router();

router.post(
  "/:kitchenId/subscribe",
  authMiddleware,
  requireRole("Voluntario"),
  (req, res) => subscribeToKitchenController.handle(req, res)
);

router.delete(
  "/:kitchenId/unsubscribe",
  authMiddleware,
  requireRole("Voluntario"),
  (req, res) => unsubscribeFromKitchenController.handle(req, res)
);

router.get(
  "/:kitchenId",
  authMiddleware,
  requireRole("Admin_cocina"),
  (req, res) => getKitchenSubscriptionsController.handle(req, res)
);

export default router;
