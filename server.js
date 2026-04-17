// PROFESSIONAL REST API SERVER
import express from "express";
import eventRoutes from "./src/routes/eventRoutes.js";
import { logger, measureTime } from "./src/middleware.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./src/swagger.js";

const app = express();
const PORT = 3000;
const API_VERSION = "v1";
// ===== MIDDLEWARE =====
app.use(express.json());
app.use(logger);
app.use(measureTime);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerSpec));

// ===== API DOCUMENTATION =====
app.get("/", (req, res) => {
 res.json({
 name: "Event Manager API",
 version: "1.0.0",
 description: "Professional REST API for event management",
 baseUrl: `http://localhost:${PORT}/api/${API_VERSION}`,
 endpoints: {
 events: {
 list: `GET /api/${API_VERSION}/events?page=1&limit=10`,
 create: `POST /api/${API_VERSION}/events`,
 get: `GET /api/${API_VERSION}/events/:id`,
 update: `PUT /api/${API_VERSION}/events/:id`,
 delete: `DELETE /api/${API_VERSION}/events/:id`,
 stats: `GET /api/${API_VERSION}/events/stats`
 },
 filters: {
 status: "?status=upcoming",
 location: "?location=Sfax",
 search: "?search=javascript",
 minCapacity: "?minCapacity=20",
 pagination: "?page=1&limit=10"
 }
 }
 });
});
// ===== API ROUTES =====
app.use(`/api/${API_VERSION}/events`, eventRoutes);
// ===== HEALTH CHECK =====
app.get("/health", (req, res) => {
 res.json({
 status: "✅ healthy",
 timestamp: new Date().toISOString(),
 uptime: process.uptime().toFixed(2) + "s"
  });
});
// ===== ERROR HANDLERS =====
// 404 Not Found
app.use((req, res) => {
 res.status(404).json({
 success: false,
 message: `Endpoint not found: ${req.method} ${req.path}`,
 timestamp: new Date().toISOString()
 });
});
// Error handler
app.use((err, req, res, _next) => {
 console.error(err);
 res.status(500).json({
 success: false,
 message: "Internal server error",
 error: process.env.NODE_ENV === "development" ? err.message : undefined,
 timestamp: new Date().toISOString()
 });
});
// ===== START SERVER =====
app.listen(PORT, () => {
 console.log(`\n✨ Professional REST API Server`);
 console.log(`📍 http://localhost:${PORT}`);
 console.log(`🔗 API v${API_VERSION} at
http://localhost:${PORT}/api/${API_VERSION}`);
 console.log(`\n🔌 Available Endpoints:`);
 console.log(` GET /api/${API_VERSION}/events`);
 console.log(` POST /api/${API_VERSION}/events`);
 console.log(` GET /api/${API_VERSION}/events/:id`);
 console.log(` PUT /api/${API_VERSION}/events/:id`);
 console.log(` DELETE /api/${API_VERSION}/events/:id`);
 console.log(` GET /api/${API_VERSION}/events/stats`);
 console.log(`\n⏹ Press Ctrl+C to stop\n`);
});