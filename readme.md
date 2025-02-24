# Task Management App

## Overview

 A simple **Task Management Application** with **user authentication** and **task CRUD operations** using **React, TypeScript, Node.js, and PostgreSQL**. 

## Tech Stack

**Frontend**: React + TypeScript 

**Backend**: Node.js (or Nest.js) 

**Database**: PostgreSQL

**Authentication**: JWT (JSON Web Token)

## Installation

```
cd backend
npm install
npm run dev
```

## Frontend setup

```cpp
cd frontend
npm install
npm start
```

the front end is running in port:5173 the backend is runing in port 5000

## API Endpoints

| Method   | Endpoint         | Description                       |
| -------- | ---------------- | --------------------------------- |
| `POST`   | `/auth/register` | Register a new user               |
| `POST`   | `/auth/login`    | Authenticate user, return JWT     |
| `GET`    | `/tasks`         | Retrieve all tasks (JWT required) |
| `POST`   | `/tasks`         | Create a task (JWT required)      |
| `PUT`    | `/tasks/:id`     | Update a task (JWT required)      |
| `DELETE` | `/tasks/:id`     | Delete a task (JWT required)      |

## Salary Expectation

 **Expected Salary:** $4000 - $5000 USD / month (negotiable)

##  Demo Video

(https://youtu.be/N0XkTJpJ8SI)

Includes:

- User Registration & Login
- Creating, Updating, and Deleting Tasks
- Logging Out & Logging Back In
