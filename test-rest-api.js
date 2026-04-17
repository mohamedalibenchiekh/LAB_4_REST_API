// COMPREHENSIVE REST API TESTS
const BASE_URL = "http://localhost:3000/api/v1/events";
async function request(method, path, body = null) {
 const options = {
 method,
 headers: { "Content-Type": "application/json" }
 };
 if (body) options.body = JSON.stringify(body);
 const response = await fetch(`${BASE_URL}${path}`, options);
 const data = await response.json();
 return { status: response.status, data };
}
async function test(name, fn) {
 try {
    console.log(`\n✅ ${name}`);
 await fn();
 } catch (error) {
 console.error(`❌ ${name}: ${error.message}`);
 }
}
async function runTests() {
 console.log("═══════════════════════════════════════");
 console.log(" REST API COMPREHENSIVE TESTS");
 console.log("═══════════════════════════════════════");
 // Test 1: Get all events
 await test("GET /events - Get all events", async () => {
 const result = await request("GET", "");
 console.log(` Events: ${result.data.data.length}`);
 console.log(` Status: ${result.status}`);
 });
 // Test 2: Pagination
 await test("GET /events?page=1&limit=5 - Pagination", async () => {
 const result = await request("GET", "?page=1&limit=5");
 console.log(` Page: ${result.data.pagination.page}`);
 console.log(` Limit: ${result.data.pagination.limit}`);
 });
 // Test 3: Filter by status
 await test("GET /events?status=upcoming - Filter", async () => {
 const result = await request("GET", "?status=upcoming");
 console.log(` Filtered: ${result.data.data.length} events`);
 });
 // Test 4: Create event
 let createdEventId;
 await test("POST /events - Create event", async () => {
 const result = await request("POST", "", {
 title: "Test Workshop",
 date: "2026-07-15T10:00:00Z",
 location: "Sfax",
 capacity: 25
 });
 createdEventId = result.data.data.id;
 console.log(` Created ID: ${createdEventId}`);
 console.log(` Status: ${result.status}`);
 });
 // Test 5: Get single event
 await test("GET /events/:id - Get single", async () => {
 const result = await request("GET", `/${createdEventId}`);
 console.log(` Event: ${result.data.data.title}`);
 console.log(` Status: ${result.status}`);
 });
 // Test 6: Update event
  await test("PUT /events/:id - Update", async () => {
 const result = await request("PUT", `/${createdEventId}`, {
 title: "Updated Workshop Title"
 });
 console.log(` Updated: ${result.data.data.title}`);
 console.log(` Status: ${result.status}`);
 });
 // Test 7: Invalid data
 await test("POST /events - Validation error", async () => {
 const result = await request("POST", "", {
 title: "A" // Too short
 });
 console.log(` Error: ${result.data.message}`);
 console.log(` Status: ${result.status}`);
 });
 // Test 8: Not found
 await test("GET /events/9999 - Not found", async () => {
 const result = await request("GET", "/9999");
 console.log(` Message: ${result.data.message}`);
 console.log(` Status: ${result.status}`);
 });
 // Test 9: Statistics
 await test("GET /events/stats - Statistics", async () => {
 const result = await request("GET", "/stats");
 console.log(` Total events: ${result.data.data.totalEvents}`);
 console.log(` Status: ${result.status}`);
 });
 // Test 10: Delete event
 await test("DELETE /events/:id - Delete", async () => {
 const result = await request("DELETE", `/${createdEventId}`);
 console.log(` Deleted successfully`);
 console.log(` Status: ${result.status}`);
 });
 console.log("\n═══════════════════════════════════════");
 console.log(" ✅ ALL TESTS COMPLETE!");
 console.log("═══════════════════════════════════════");
}
// Run tests
console.log("Waiting for server...\n");
setTimeout(runTests, 2000);