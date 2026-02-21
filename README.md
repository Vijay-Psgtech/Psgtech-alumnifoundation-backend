# PSG Alumni Foundation – Backend

This repository contains the **Express/MongoDB backend** for the PSG Alumni Foundation application.  
It exposes RESTful APIs for authentication, alumni data, donations and admin dashboards.

## 📁 Project Structure

\`\`\`
config/
controllers/
middleware/
models/
routes/
Server.js
setupAdmin.js
package.json
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js v16+  
- MongoDB (local or Atlas)  
- npm (comes with Node)

### Installation

\`\`\`bash
cd Server
npm install
\`\`\`

### Environment Variables

Create a `.env` file at project root with the following keys:

\`\`\`env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<random-secret>
ADMIN_EMAIL=<initial-admin-email>
ADMIN_PASSWORD=<initial-admin-password>
\`\`\`

> **Tip:** use `setupAdmin.js` once to seed the first admin account, then delete or secure it.

### Running

Start the server in development mode:

\`\`\`bash
npm run dev          # assumes nodemon
\`\`\`

Or in production:

\`\`\`bash
npm start
\`\`\`

Server will listen on `http://localhost:<PORT>` (default 5000).

---

## 🛠 Core Features

- **Admin authentication & management**  
- **Alumni CRUD operations**  
- **Donation tracking**  
- **Protected routes with JWT**

Middleware (in `middleware/`) handles authorization (`auth.js` for users, `adminAuth.js` for admins).

---

## 🔗 API Endpoints

> Base URL: `http://localhost:5000/api`

### Authentication

| Method | Route               | Description                        |
|--------|---------------------|------------------------------------|
| POST   | `/auth/register`    | Register a new user/alumnus       |
| POST   | `/auth/login`       | Login and receive JWT              |
| GET    | `/auth/profile`     | Get current user profile (protected) |

### Alumni

| Method | Route                 | Protected | Description                  |
|--------|-----------------------|-----------|------------------------------|
| GET    | `/alumni/`            | admin     | List all alumni              |
| GET    | `/alumni/:id`         | admin     | Get single alumnus by ID     |
| POST   | `/alumni/`            | admin     | Create a new alumnus         |
| PUT    | `/alumni/:id`         | admin     | Update alumnus               |
| DELETE | `/alumni/:id`         | admin     | Remove alumnus               |

### Donations

| Method | Route                  | Protected | Description                      |
|--------|------------------------|-----------|----------------------------------|
| GET    | `/donations/`          | user/admin | List all donations               |
| POST   | `/donations/`          | user      | Create a new donation record     |

### Admin Dashboard

| Method | Route                    | Protected (admin) | Description               |
|--------|--------------------------|-------------------|---------------------------|
| GET    | `/adminDash/stats`       | yes               | Retrieve dashboard stats  |
| POST   | `/adminDash/...`         | yes               | (other admin actions)     |

### Admin Auth

| Method | Route                   | Description              |
|--------|-------------------------|--------------------------|
| POST   | `/adminAuth/login`      | Admin login              |
| POST   | `/adminAuth/register`   | Register new admin (admin only) |

> See individual controller files for more details.

---

## 📦 Models

- **Admin** – admin users  
- **Alumni** – alumni records  
- **Donation** – donation entries  

Located under `models/` with Mongoose schemas.

---
