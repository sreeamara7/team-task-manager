# Team Task Manager

A full-stack Team Task Manager web application built for placement assignment submission.

## Live Demo

Frontend: https://creative-miracle-production-55ee.up.railway.app

Backend API: https://team-task-manager-production-c464.up.railway.app

GitHub Repository: https://github.com/sreeamara7/team-task-manager

---

## Project Overview

Team Task Manager is a role-based task management platform where administrators can create projects, assign tasks to team members, and monitor task progress through an analytics dashboard.

Members can view assigned tasks and update their task status in real time.

---

## Features

### Authentication
- User registration
- User login
- JWT authentication
- Protected routes
- Persistent login sessions

### Role-Based Access
#### Admin
- Create projects
- View all projects
- Create and assign tasks
- View all tasks
- Access dashboard analytics

#### Member
- View assigned tasks
- Update task status
- View dashboard analytics
- View projects

---

## Dashboard Analytics
- Total tasks
- Pending tasks
- In-progress tasks
- Completed tasks
- Overdue tasks
- Task completion performance chart

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- React Toastify
- Recharts
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- CORS
- dotenv

### Deployment
- Railway

---

## Demo Credentials

### Admin Account
Email:
```text
amara@test.com
```

Password:
```text
123456
```

### Member Account
Email:
```text
member@test.com
```

Password:
```text
123456
```

---

## Local Setup Instructions

### Clone Repository
```bash
git clone https://github.com/sreeamara7/team-task-manager.git
cd team-task-manager
```

---

## Backend Setup
```bash
cd server
npm install
npm run dev
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```

---

## Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## Application Workflow

### Admin Flow
1. Login as admin
2. Create project
3. Create task
4. Assign task to member
5. Monitor dashboard analytics

### Member Flow
1. Login as member
2. View assigned tasks
3. Update task progress
4. Dashboard reflects changes

---

## Deployment Links

Frontend:
https://creative-miracle-production-55ee.up.railway.app

Backend:
https://team-task-manager-production-c464.up.railway.app

---

## Assignment Deliverables Completed

- Full-stack implementation
- Authentication system
- Role-based access control
- Project management
- Task assignment & tracking
- Dashboard analytics
- Railway deployment
- GitHub repository
- README documentation
- Demo-ready application

---

## Author

Amara Sree
