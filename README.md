# 🎓 Full-Stack Student Management System (Dockerized)

A professional, containerized CRUD application engineered with a **Node.js (Express)** backend, **Vanilla JavaScript** frontend, and a **PostgreSQL** relational database running entirely with **Docker Compose**.

---

# 📋 Table of Contents

1. [🏗 Architecture Overview](#-architecture-overview)
2. [📂 Project Directory Layout](#-project-directory-layout)
3. [🛠 Prerequisites](#-prerequisites)
4. [🔑 Environment Configuration (.env)](#-environment-configuration-env)
5. [🚀 Quick Start Deployment](#-quick-start-deployment)
6. [🗃 Database Automation Initialization](#-database-automation-initialization)
7. [💻 Local Development & Live Reloading](#-local-development--live-reloading)
8. [📡 API Documentation Reference](#-api-documentation-reference)
9. [🛑 Tearing Down the Stack](#-tearing-down-the-stack)

---

# 🏗 Architecture Overview

This application operates as a fully containerized multi-service environment using Docker Compose. Each service is isolated while communicating through Docker's internal bridge network.

### Frontend Layer

* HTML5 user interface
* CSS3 styling
* Vanilla JavaScript
* Fetch API for asynchronous requests

### Backend Layer

* Node.js runtime
* Express.js framework
* RESTful API endpoints
* PostgreSQL connection pooling

### Database Layer

* PostgreSQL relational database
* Persistent Docker Volume
* Automatic schema initialization

All containers communicate securely through Docker's internal networking without exposing unnecessary services.

[🔺 Back to Top](#-table-of-contents)

---

# 📂 Project Directory Layout

```text
student-management/
│
├── db/
│   └── database.js
│
├── db-init/
│   └── init.sql
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
├── README.md
└── server.js
```

### Directory Description

| File / Folder        | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `db/`                | PostgreSQL connection pool configuration |
| `db-init/`           | Automatic SQL initialization scripts     |
| `public/`            | Frontend HTML, CSS and JavaScript        |
| `.env`               | Local environment variables              |
| `.env.example`       | Example environment configuration        |
| `Dockerfile`         | Builds the Node.js application image     |
| `docker-compose.yml` | Orchestrates all Docker containers       |
| `package.json`       | Project dependencies and scripts         |
| `server.js`          | Main Express server                      |

[🔺 Back to Top](#-table-of-contents)

---

# 🛠 Prerequisites

Before running this project, install the following software:

* Git
* Docker Desktop
* Docker Engine
* Docker Compose

Verify your installation:

```bash
git --version
docker --version
docker compose version
```

[🔺 Back to Top](#-table-of-contents)

---

# 🔑 Environment Configuration (.env)

Create a local environment file by copying the example configuration.

```bash
cp .env.example .env
```

If you're using Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open the `.env` file and update it with your preferred configuration.

```env
DB_USER=admin
DB_PASSWORD=your_secure_password
DB_NAME=docker_course
DB_PORT=5432

PORT=3000
```

[🔺 Back to Top](#-table-of-contents)

---

# 🚀 Quick Start Deployment

## Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/student-management.git

cd student-management
```

---

## Step 2 — Build and Start Containers

```bash
docker compose up -d --build
```

Docker will automatically:

* Build the Node.js image
* Download the PostgreSQL image
* Create the Docker network
* Create persistent storage
* Start every container

---

## Step 3 — Open the Application

Visit:

```
http://localhost:3000
```

Your Student Management System should now be running.

[🔺 Back to Top](#-table-of-contents)

---

# 🗃 Database Automation Initialization

The project automatically creates the database schema during the first startup.

The SQL initialization file:

```
db-init/init.sql
```

is mounted into PostgreSQL's initialization directory.

Example from `docker-compose.yml`:

```yaml
volumes:
  - pgdata:/var/lib/postgresql/data
  - ./db-init:/docker-entrypoint-initdb.d
```

During the first startup, PostgreSQL automatically executes every SQL script inside:

```
/docker-entrypoint-initdb.d
```

This creates all required tables without any manual SQL commands.

[🔺 Back to Top](#-table-of-contents)

---

# 💻 Local Development & Live Reloading

This project supports rapid development inside Docker.

### Nodemon

Nodemon automatically restarts the Express server whenever backend files change.

### Bind Mount

Docker maps your project folder directly into the running container.

Any changes made to:

```
server.js
```

or

```
public/
```

are reflected immediately without rebuilding the Docker image.

Only major dependency changes require rebuilding:

```bash
docker compose up -d --build
```

[🔺 Back to Top](#-table-of-contents)

---

# 📡 API Documentation Reference

| Method | Endpoint            | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/api/students`     | Retrieve all students          |
| POST   | `/api/students`     | Create a new student           |
| PUT    | `/api/students/:id` | Update a student's information |
| DELETE | `/api/students/:id` | Delete a student               |

## POST Request

```json
{
  "name": "David",
  "major": "Software Engineering"
}
```

## PUT Request

```json
{
  "major": "Computer Science"
}
```

[🔺 Back to Top](#-table-of-contents)

---

# 🛑 Tearing Down the Stack

Stop all running containers:

```bash
docker compose down
```

Stop containers and remove the database volume:

```bash
docker compose down -v
```

Rebuild everything from scratch:

```bash
docker compose up -d --build
```

[🔺 Back to Top](#-table-of-contents)
