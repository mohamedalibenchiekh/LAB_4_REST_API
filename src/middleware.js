// CUSTOM MIDDLEWARE
// Logger middleware - logs every request
export const logger = (req, res, next) => {
 const timestamp = new Date().toISOString();
 console.log(`\n[${timestamp}] ${req.method} ${req.path}`);
 console.log(` Body: ${JSON.stringify(req.body)}`);
 next(); // Move to next middleware
};
// Validation middleware - checks required fields (for POST only)
export const validateEventInput = (req, res, next) => {
 const { title, date, location, capacity } = req.body;

 // Check required fields (only for POST, not PUT)
 if (req.method === "POST") {
 if (!title || !date || !location || !capacity) {
 return res.status(400).json({
 success: false,
 message: "Missing required fields",
 required: ["title", "date", "location", "capacity"]
 });
 }
 }

 // Validate types for provided fields
 if (title !== undefined && typeof title !== "string") {
 return res.status(400).json({
 success: false,
 message: "Title must be a string"
 });
 }

 if (capacity !== undefined && (typeof capacity !== "number" || capacity < 1)) {
 return res.status(400).json({
 success: false,
 message: "Capacity must be a number >= 1"
 });
 }

 next();
};
// Timing middleware - measure request time
export const measureTime = (req, res, next) => {
 const start = Date.now();

 // Hook into res.json to measure when response is sent
 const originalJson = res.json;
 res.json = function(data) {
 const elapsed = Date.now() - start;
 console.log(` ⏱ Response time: ${elapsed}ms`);
 return originalJson.call(this, data);
 };

 next();
};
// Error handling middleware
export const errorHandler = (err, req, res, _next) => {
 console.error("❌ ERROR:", err.message);

 res.status(err.status || 500).json({
 success: false,
 message: err.message || "Internal Server Error",
 error: process.env.NODE_ENV === "development" ? err : {}
 });
};