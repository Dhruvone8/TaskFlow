# TaskFlow API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### Authentication

#### Register User
Create a new user account.

```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

#### Login User
Authenticate and receive a JWT token.

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

#### Get Current User
Get the authenticated user's profile.

```http
GET /auth/me
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Tasks

#### List All Tasks
Get all tasks for the authenticated user.

```http
GET /tasks
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status: `pending`, `in-progress`, `completed` |
| priority | string | Filter by priority: `low`, `medium`, `high` |
| sort | string | Sort by: `createdAt`, `dueDate`, `priority`, `status` |

**Example:**
```
GET /tasks?status=pending&priority=high&sort=dueDate
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project",
      "description": "Finish the task management app",
      "status": "in-progress",
      "priority": "high",
      "dueDate": "2026-02-15T00:00:00.000Z",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2026-01-31T12:00:00.000Z",
      "updatedAt": "2026-01-31T12:00:00.000Z"
    }
  ]
}
```

---

#### Create Task
Create a new task.

```http
POST /tasks
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete project",
  "description": "Finish the task management app",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-02-15"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Task title (max 100 chars) |
| description | string | No | Task description (max 500 chars) |
| status | string | No | `pending` (default), `in-progress`, `completed` |
| priority | string | No | `low`, `medium` (default), `high` |
| dueDate | date | No | Due date in ISO format |

**Success Response (201):**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-02-15T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-01-31T12:00:00.000Z",
    "updatedAt": "2026-01-31T12:00:00.000Z"
  }
}
```

---

#### Get Single Task
Get a specific task by ID.

```http
GET /tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task management app",
    "status": "pending",
    "priority": "high",
    "dueDate": "2026-02-15T00:00:00.000Z",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-01-31T12:00:00.000Z",
    "updatedAt": "2026-01-31T12:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Task not found"
}
```

**Error Response (403):**
```json
{
  "success": false,
  "message": "Not authorized to access this task"
}
```

---

#### Update Task
Update an existing task.

```http
PUT /tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated title",
  "status": "completed"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated title",
    "status": "completed",
    ...
  }
}
```

---

#### Delete Task
Delete a task.

```http
DELETE /tasks/:id
```

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Not authorized for this resource |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding rate limiting middleware.

## Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-31T12:00:00.000Z"
}
```
