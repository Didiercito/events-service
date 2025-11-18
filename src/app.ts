import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import eventRoutes from "./infrastructure/api/routes/event.routes";
import eventRegistrationRoutes from "./infrastructure/api/routes/event-registration.routes";
import eventSubscriptionRoutes from "./infrastructure/api/routes/event-subscription.routes";

const app: Application = express();

app.use(helmet());
app.use(cors({
  origin: "*",}));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Events Service is running",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/event-registrations", eventRegistrationRoutes);
app.use("/api/v1/event-subscriptions", eventSubscriptionRoutes);

app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found`
  });
});

export default app;
