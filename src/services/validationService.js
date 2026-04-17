// VALIDATION SERVICE
// Validate event data
export class ValidationService {
 // Validate event creation/update
 static validateEvent(data, isUpdate = false) {
 const errors = {};

 this._validateTitle(data.title, isUpdate, errors);
 this._validateDate(data.date, isUpdate, errors);
 this._validateLocation(data.location, isUpdate, errors);
 this._validateCapacity(data.capacity, isUpdate, errors);
 this._validateDescription(data.description, errors);

 return {
 isValid: Object.keys(errors).length === 0,
 errors
 };
 }

 // Private helper: Validate title
 static _validateTitle(title, isUpdate, errors) {
 if (!isUpdate || title !== undefined) {
 if (!title) {
 errors.title = "Title is required";
 } else if (title.length < 3) {
 errors.title = "Title must be at least 3 characters";
 } else if (title.length > 100) {
 errors.title = "Title must not exceed 100 characters";
 }
 }
 }

 // Private helper: Validate date
 static _validateDate(date, isUpdate, errors) {
 if (!isUpdate || date !== undefined) {
 if (!date) {
 errors.date = "Date is required";
 } else if (isNaN(new Date(date).getTime())) {
 errors.date = "Date must be a valid ISO 8601 date";
 } else if (new Date(date) < new Date()) {
 errors.date = "Date must be in the future";
 }
 }
 }

 // Private helper: Validate location
 static _validateLocation(location, isUpdate, errors) {
 if (!isUpdate || location !== undefined) {
 if (!location) {
 errors.location = "Location is required";
 } else if (location.length < 2) {
 errors.location = "Location must be at least 2 characters";
 } else if (location.length > 100) {
 errors.location = "Location must not exceed 100 characters";
 }
 }
 }

 // Private helper: Validate capacity
 static _validateCapacity(capacity, isUpdate, errors) {
 if (!isUpdate || capacity !== undefined) {
 if (capacity === undefined) {
 errors.capacity = "Capacity is required";
 } else if (!Number.isInteger(capacity)) {
 errors.capacity = "Capacity must be a number";
 } else if (capacity < 1) {
 errors.capacity = "Capacity must be at least 1";
 } else if (capacity > 10000) {
 errors.capacity = "Capacity must not exceed 10000";
 }
 }
 }

 // Private helper: Validate description
 static _validateDescription(description, errors) {
 if (description && description.length > 1000) {
 errors.description = "Description must not exceed 1000 characters";
 }
 }
 // Validate ID
 static validateId(id) {
 return !isNaN(parseInt(id)) && parseInt(id) > 0;
 }
 // Validate pagination params
 static validatePagination(page, limit) {
 const errors = {};
 if (!page) {
 page = 1;
 } else if (isNaN(page) || page < 1) {
 errors.page = "Page must be a positive number";
 }
 if (!limit) {
 limit = 10;
 } else if (isNaN(limit) || limit < 1 || limit > 100) {
 errors.limit = "Limit must be between 1 and 100";
 }
 return {
 isValid: Object.keys(errors).length === 0,
 errors,
 page: parseInt(page),
 limit: parseInt(limit)
 };
 }
}
export default ValidationService;