// REST API CONSTANTS
export const HTTP_METHODS = {
 GET: "GET",
 POST: "POST",
 PUT: "PUT",
 DELETE: "DELETE",
 PATCH: "PATCH"
};
export const STATUS_CODES = {
 // Success
 OK: 200,
 CREATED: 201,
 ACCEPTED: 202,
 NO_CONTENT: 204,
 // Client errors
 BAD_REQUEST: 400,
 UNAUTHORIZED: 401,
 FORBIDDEN: 403,
 NOT_FOUND: 404,
 CONFLICT: 409,
 UNPROCESSABLE: 422,
 // Server errors
 INTERNAL_ERROR: 500,
 NOT_IMPLEMENTED: 501,
 SERVICE_UNAVAILABLE: 503
};
export const HTTP_MESSAGES = {
 200: "Request successful",
 201: "Resource created successfully",
 204: "Request successful (no content)",
 400: "Invalid request data",
 401: "Authentication required",
 403: "Access denied",
 404: "Resource not found",
 409: "Resource conflict",
 500: "Internal server error",
 503: "Service unavailable"
};
export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;
export const VALIDATION_RULES = {
 event: {
 title: {
 required: true,
 minLength: 3,
 maxLength: 100,
 type: "string"
 },
 date: {
 required: true,
 type: "string",
 format: "ISO8601"
 },
 location: {
 required: true,
 minLength: 2,
 maxLength: 100,
 type: "string"
 },
 capacity: {
 required: true,
 type: "number",
 min: 1,
 max: 10000
 },
 description: {
 required: false,
 maxLength: 1000,
 type: "string"
 }
 }
};