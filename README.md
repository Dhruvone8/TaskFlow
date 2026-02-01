# TaskFlow - Task Management Web Application

A modern, full-stack task management application built with React, Node.js, Express, and MongoDB. Features user authentication, CRUD operations for tasks, filtering, sorting, and a beautiful glassmorphism UI design.

![TaskFlow](https://img.shields.io/badge/TaskFlow-Task%20Management-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task CRUD**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, status, priority, and due date
- **Filtering & Sorting**: Filter by status/priority, sort by date/priority
- **Statistics Dashboard**: Overview of task counts by status
- **Modern UI**: Glassmorphism design with smooth animations
- **Responsive**: Works on desktop, tablet, and mobile
- **Dark Mode**: Beautiful dark theme with gradient accents
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **TailwindCSS 4** - Styling
- **React Router 6** - Routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MongoDB Atlas** account (free tier available)
- **Vercel** account (for deployment)

## 🚀 Quick Start

### Local Development

#### 1. Clone the repository
```bash
git clone <repository-url>
cd GT\ Assignment
```

#### 2. Set up MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/taskmanager`)

#### 3. Set up the Backend
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB Atlas URI and JWT secret
# MONGODB_URI=mongodb+srv://your-connection-string
# JWT_SECRET=your-secure-secret-key
```

#### 4. Set up the Frontend
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit VITE_API_URL if needed
```

#### 5. Run the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

#### 6. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🚢 Vercel Deployment

### Deploy Frontend

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Select the `frontend` folder as the root directory
5. Add environment variable:
   - `VITE_API_URL` = your backend Vercel URL (e.g., `https://your-backend.vercel.app/api`)
6. Deploy!

### Deploy Backend

1. Go to [Vercel](https://vercel.com)
2. Create a new project
3. Import your repository
4. Select the `backend` folder as the root directory
5. Add environment variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a secure random string
   - `JWT_EXPIRE` = 7d
   - `FRONTEND_URL` = your frontend Vercel URL
   - `NODE_ENV` = production
6. Deploy!

### Important: Update CORS

After deploying, update the `FRONTEND_URL` in your backend's environment variables to match your frontend's Vercel URL.

---

## 📁 Project Structure

```
GT Assignment/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   └── taskController.js  # Task CRUD logic
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   └── tasks.js           # Task routes
│   ├── tests/                 # Automated tests
│   │   ├── auth.test.js       # Auth endpoint tests
│   │   └── tasks.test.js      # Task endpoint tests
│   ├── .env.example
│   ├── vercel.json            # Vercel config
│   ├── package.json
│   └── server.js              # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React Context (Auth)
│   │   ├── pages/             # Page components
│   │   ├── services/          # API client
│   │   └── tests/             # Frontend tests
│   ├── .env.example
│   └── package.json
├── README.md
└── API.md
```

---

## ⚙️ Environment Variables

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/taskmanager

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🧪 Testing

### What are the test files?

The `tests` folder contains automated tests that verify your API works correctly:

- **`auth.test.js`** - Tests user registration, login, and token verification
- **`tasks.test.js`** - Tests task CRUD operations (create, read, update, delete)

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests  
cd frontend
npm test
```

---

## 📚 API Documentation

See [API.md](./API.md) for detailed API documentation.

### Quick Reference

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register user | No |
| POST | /api/auth/login | Login user | No |
| GET | /api/auth/me | Get current user | Yes |
| GET | /api/tasks | List all tasks | Yes |
| POST | /api/tasks | Create task | Yes |
| GET | /api/tasks/:id | Get task by ID | Yes |
| PUT | /api/tasks/:id | Update task | Yes |
| DELETE | /api/tasks/:id | Delete task | Yes |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
