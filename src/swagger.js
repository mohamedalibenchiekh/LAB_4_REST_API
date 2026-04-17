// SWAGGER/OPENAPI DOCUMENTATION
import swaggerJsdoc from "swagger-jsdoc";
const options = {
 definition: {
 openapi: "3.0.0",
 info: {
 title: "Event Manager API",
 version: "1.0.0",
 description: "Professional REST API for managing events",
 contact: {
 name: "Mohamed Amine Marzouk",
 email: "med.amine.mzk@horizon-tech.tn"
 }
 },
 servers: [
 {
 url: "http://localhost:3000",
 description: "Development server"
 }
 ]
 },
 apis: ["./src/routes/eventRoutes.js"]
};
export const swaggerSpec = swaggerJsdoc(options);