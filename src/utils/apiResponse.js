// API RESPONSE WRAPPER
// Standardize all responses
export class ApiResponse {
 constructor(success, data = null, message = "", statusCode = 200) {
 this.success = success;
 this.data = data;
 this.message = message;
 this.statusCode = statusCode;
  this.timestamp = new Date().toISOString();
 }
 // Success response
 static success(data, message = "Success", statusCode = 200) {
 return new ApiResponse(true, data, message, statusCode);
 }
 // Created response
 static created(data, message = "Resource created successfully") {
 return new ApiResponse(true, data, message, 201);
 }
 // Error response
 static error(message, statusCode = 400, data = null) {
 return new ApiResponse(false, data, message, statusCode);
 }
 // Not found response
 static notFound(resource = "Resource") {
 return new ApiResponse(false, null, `${resource} not found`, 404);
 }
 // Validation error
 static validationError(errors) {
 return new ApiResponse(
 false,
 errors,
 "Validation failed",
 422
 );
 }
 // Paginated response
 static paginated(items, page, limit, total, message = "Success") {
 return {
 success: true,
 data: items,
 pagination: {
 page: parseInt(page),
 limit: parseInt(limit),
 total: total,
 pages: Math.ceil(total / limit),
 hasMore: page * limit < total
 },
 message,
 timestamp: new Date().toISOString()
 };
 }
 // Convert to JSON
 toJSON() {
 return {
 success: this.success,
 ata: this.data,
 message: this.message,
 timestamp: this.timestamp
 };
 }
}
export default ApiResponse;