# Event Manager API - Lab 4

A professional REST API built with Node.js and Express.js for managing events. This project demonstrates best practices in RESTful API design, including middleware usage, validation, documentation, and structured responses.

## 🚀 Features

- **Full CRUD operations** for Events.
- **Advanced Filtering**: Filter events by status, location, capacity, or search query.
- **Pagination**: Efficiently retrieve large datasets.
- **Statistics**: Endpoint to get aggregate data about events.
- **Swagger Documentation**: Interactive API documentation.
- **Health Check**: Endpoint to monitor API status.
- **Custom Middleware**: Logging, request timing, and error handling.

## 🛠️ Tech Stack

- **Node.js** (v20+)
- **Express.js** (v5.0.0)
- **Swagger UI** (swagger-ui-express & swagger-jsdoc)

## 📁 Project Structure

```text
.
├── server.js               # Main entry point
├── src/
│   ├── routes/             # API Route definitions
│   ├── controllers/        # Request handlers & logic
│   ├── models/             # Data models & storage
│   ├── services/           # Business logic & validation
│   ├── utils/              # Helper functions & response templates
│   ├── middleware.js       # Custom Express middleware
│   └── swagger.js          # Swagger configuration
├── test-api.js             # API testing script
└── test-rest-api.js        # REST API specific tests
```

## ⚙️ Installation & Setup

1. **Clone the repository** (if applicable):
   ```bash
   git clone https://github.com/mohamedalibenchiekh/LAB_4_REST_API
   cd LAB_4_REST_API
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   # Production mode
   npm start

   # Development mode (with hot-reload)
   npm run dev
   ```

The server will be running at `http://localhost:3000`.

## 📡 API Endpoints

The API is versioned and accessible under `/api/v1/`.

### Events

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/events` | List all events (supports pagination & filters) |
| `POST` | `/api/v1/events` | Create a new event |
| `GET` | `/api/v1/events/:id` | Get details of a specific event |
| `PUT` | `/api/v1/events/:id` | Update an existing event |
| `DELETE` | `/api/v1/events/:id` | Remove an event |
| `GET` | `/api/v1/events/stats` | Get aggregate statistics |

### Utility

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Information / Root endpoint |
| `GET` | `/health` | Server health status |
| `GET` | `/api-docs` | Swagger Documentation |

## 📖 Documentation

Visit `http://localhost:3000/api-docs` in your browser to explore the interactive API documentation and test endpoints directly.

## 🧪 Testing

You can run the provided test scripts to verify API functionality:

```bash
node test-rest-api.js
```

## 📝 License

This project is licensed under the MIT License - see the `package.json` file for details.
