// TEST API ENDPOINTS
// Run: node test-api.js
import http from "http";
// Helper function to make requests
function makeRequest(method, path, data = null) {
 return new Promise((resolve, reject) => {
 const options = {
 hostname: "localhost",
 port: 3000,
 path: path,
 method: method,
 headers: {
 "Content-Type": "application/json"
 }
 };
 const req = http.request(options, (res) => {
 let body = "";
 res.on("data", (chunk) => body += chunk);
 res.on("end", () => {
 resolve({
 status: res.statusCode,
 body: JSON.parse(body)
 });
 });
 });
 req.on("error", reject);
 if (data) {
 req.write(JSON.stringify(data));
 }
 req.end();
 });
}
// Test all endpoints
async function testAPI() {
 console.log("═══════════════════════════════════════");
 console.log(" TESTING EVENT MANAGER API");
 console.log("═══════════════════════════════════════\n");
 try {
 // Test 1: GET all events
 console.log(" GET /api/events\n");
 let result = await makeRequest("GET", "/api/events");
 console.log("Status:", result.status);
 console.log("Events:", result.body.count, "\n");
 // Test 2: CREATE event
 console.log(" POST /api/events\n");
 result = await makeRequest("POST", "/api/events", {
 title: "Docker Masterclass",
 date: "2026-06-01",
 location: "Sfax",
 capacity: 35
 });
 console.log("Status:", result.status);
 console.log("Created:", result.body.data.title, "\n");
 // Test 3: GET single event
 console.log(" GET /api/events/1\n");
 result = await makeRequest("GET", "/api/events/1");
 console.log("Status:", result.status);
 console.log("Event:", result.body.data.title, "\n");
 // Test 4: UPDATE event
 console.log(" PUT /api/events/1\n");
 result = await makeRequest("PUT", "/api/events/1", {
 title: "Advanced JavaScript Workshop"
 });
 console.log("Status:", result.status);
 console.log("Updated:", result.body.data.title, "\n");
 // Test 5: DELETE event
 console.log(" DELETE /api/events/2\n");
 result = await makeRequest("DELETE", "/api/events/2");
 console.log("Status:", result.status);
 console.log("Deleted:", result.body.data.title, "\n");
 // Test 6: GET all (verify delete)
 console.log(" GET /api/events (after delete)\n");
 result = await makeRequest("GET", "/api/events");
 console.log("Status:", result.status);
 console.log("Remaining events:", result.body.count, "\n");
 // Test 7: Error handling (invalid data)
 console.log(" POST /api/events (invalid)\n");
 result = await makeRequest("POST", "/api/events", {
 title: "Incomplete Event"
 // Missing: date, location, capacity
 });
 console.log("Status:", result.status);
 console.log("Error:", result.body.message, "\n");
 // Test 8: 404 error
 console.log(" GET /api/events/999\n");
 result = await makeRequest("GET", "/api/events/999");
 console.log("Status:", result.status);
 console.log("Message:", result.body.message, "\n");
 console.log("═══════════════════════════════════════");
 console.log(" ✅ ALL TESTS COMPLETE!");
 console.log("═══════════════════════════════════════");
 } catch (error) {
 console.error("❌ Test failed:", error.message);
 }
}
// Run tests
console.log("Waiting for server...\n");
setTimeout(testAPI, 1000);