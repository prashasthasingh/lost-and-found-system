# Lost & Found Item Management System

A full-stack MERN web application for managing lost and found items on a college campus.

## Tech Stack

| Layer    | Technology                                |
| -------- | ----------------------------------------- |
| Frontend | React.js, React Router DOM, Axios, Bootstrap |
| Backend  | Node.js, Express.js                       |
| Database | MongoDB (Mongoose ODM)                    |
| Auth     | JWT (jsonwebtoken) + bcryptjs             |

---

## Project Structure

```
lost_and_found_system/
├── backend/
│   ├── config/          → MongoDB connection (db.js)
│   ├── controllers/     → authController.js, itemController.js
│   ├── middleware/      → authMiddleware.js (JWT protect)
│   ├── models/          → User.js, Item.js
│   ├── routes/          → authRoutes.js, itemRoutes.js
│   ├── .env             → Environment variables
│   ├── server.js        → Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/          → index.html (Bootstrap CDN included)
│   ├── src/
│   │   ├── components/  → Navbar.js
│   │   ├── pages/       → Login.js, Register.js, Dashboard.js
│   │   ├── services/    → api.js (all Axios API calls)
│   │   ├── App.js       → Routes + ProtectedRoute
│   │   ├── index.js     → React entry point
│   │   └── App.css      → Global styles
│   └── package.json
│
└── report/              → For PDF screenshots / documentation
```

---

## Setup & Run Locally

### Prerequisites
- Node.js installed
- MongoDB running locally OR a MongoDB Atlas URI

### Step 1: Setup Backend
```bash
cd backend
npm install
```

Edit `.env` file:
```
MONGO_URI=mongodb://localhost:27017/lost_found_db
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start backend:
```bash
npm run dev
```
> Backend runs on: `http://localhost:5000`

---

### Step 2: Setup Frontend
```bash
cd frontend
npm install
npm start
```
> Frontend runs on: `http://localhost:3000`

---

## API Endpoints (for Postman Testing)

### Auth Routes (Public)

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | /api/register   | Register a new user |
| POST   | /api/login      | Login user, get JWT |

### Item Routes (Protected — need JWT token in Authorization header)

| Method | Endpoint                     | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST   | /api/items                   | Add a new item           |
| GET    | /api/items                   | Get all items            |
| GET    | /api/items/:id               | Get item by ID           |
| PUT    | /api/items/:id               | Update item (owner only) |
| DELETE | /api/items/:id               | Delete item (owner only) |
| GET    | /api/items/search?name=xyz   | Search items by name     |

**Authorization Header format:**
```
Authorization: Bearer <your_jwt_token>
```

---

## Sample Postman Test Data

### Register
```json
POST http://localhost:5000/api/register
{
  "name": "Rahul Kumar",
  "email": "rahul@college.com",
  "password": "123456"
}
```

### Login
```json
POST http://localhost:5000/api/login
{
  "email": "rahul@college.com",
  "password": "123456"
}
```

### Add Item (with Bearer token)
```json
POST http://localhost:5000/api/items
{
  "itemName": "Blue Water Bottle",
  "description": "Lost near the library",
  "type": "Lost",
  "location": "Library",
  "date": "2024-04-20",
  "contactInfo": "9876543210"
}
```

---

## Features

- ✅ User Registration with hashed password (bcrypt)
- ✅ User Login with JWT token
- ✅ Protected routes (JWT middleware)
- ✅ Add Lost/Found items
- ✅ View all items
- ✅ Search items by name
- ✅ Update item (owner only)
- ✅ Delete item (owner only)
- ✅ Logout (clears localStorage)
- ✅ Responsive UI using Bootstrap

---

## Deployment

- **Backend** → Deploy on [Render](https://render.com) (set env variables there)
- **Frontend** → Deploy on [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
- **Database** → Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier)
