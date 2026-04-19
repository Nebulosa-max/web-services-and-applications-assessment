# StudySprint

## Web Services and Applications Assessment

StudySprint is a Flask web application created for the **Web Services and Applications** module assessment.

The project is designed as a study and task management system where users can register, log in, manage subjects, and manage tasks linked to those subjects.

At this stage of development, the application already includes user authentication, subject management, and task management features.

---

## Project Overview

The goal of this project is to build a web application that uses:

- a **Flask backend**
- a **database**
- **RESTful routes**
- a **web interface**
- **AJAX / Fetch requests**
- CRUD functionality

This project is being developed step by step, with the intention of keeping the code well organised, easy to explain, and easy to run.

---

## Features Implemented So Far

### 1. User Authentication

The application currently supports:

- user registration
- user login
- user logout
- protected dashboard access for logged-in users only

Authentication is handled using:

- `Flask-Login`
- password hashing with Werkzeug

### 2. Subject Management

Users can currently manage study subjects from the dashboard.

Implemented subject features:

- create a new subject
- list all subjects belonging to the logged-in user
- delete a subject

Subjects are stored in the database and linked to the authenticated user.

### 3. Task Management

Users can currently manage study tasks linked to subjects.

Implemented task features:

- create a new task
- list tasks for the logged-in user
- link each task to a subject
- set description, due date, and priority
- mark tasks as completed / pending
- delete tasks

Tasks are stored in the database and linked both to:

- the authenticated user
- a selected subject

---

## Technologies Used

- **Python**
- **Flask**
- **Flask-SQLAlchemy**
- **Flask-Login**
- **SQLite**
- **HTML**
- **CSS**
- **JavaScript**
- **Fetch API**

---

## Project Structure

```text
web-services-and-applications-assessment/
│
├── app.py
├── config.py
├── README.md
├── references.md
├── ai_prompts.md
├── requirements.txt
├── .gitignore
│
├── models/
│   ├── __init__.py
│   ├── user.py
│   ├── subject.py
│   └── task.py
│
├── routes/
│   ├── __init__.py
│   ├── auth_routes.py
│   ├── subject_routes.py
│   └── task_routes.py
│
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── static/
│   ├── style.css
│   └── app.js
│
└── instance/
    └── database.db

   ## Database Structure
The project currently uses three main tables:
User
Stores registered users.
Fields include:
- id
- username
- email
- password_hash
- Subject
- Stores subjects created by each user.
* Fields include:
id
name
description
user_id
Task
Stores tasks created by each user.
Fields include:
id
title
description
due_date
priority
completed
user_id
subject_id
Current Application Flow
A user registers an account.
The user logs in.
The user is redirected to the dashboard.
The user can create subjects.
The user can create tasks linked to those subjects.
The user can mark tasks as completed or delete them.
How to Run the Project
1. Clone the repository
git clone https://github.com/Nebulosa-max/web-services-and-applications-assessment.git
cd web-services-and-applications-assessment
2. Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate
3. Install dependencies
pip install -r requirements.txt
4. Run the application
python app.py
5. Open in browser
http://127.0.0.1:5000
Current Status
At this point, the following core components are working:
Flask application setup
database creation
user registration and login
protected dashboard
subject creation and deletion
task creation and deletion
task completion toggle
frontend interaction using JavaScript Fetch calls
This is still an ongoing project and more features will be added.
Planned Next Steps
The next stages of development may include:
editing subjects
editing tasks
dashboard statistics
better task filtering
improved frontend styling
integration with a third-party API
deployment of the application
additional documentation and references
Notes
This repository contains only files related to the project.
The project is being developed incrementally, with regular commits to show progress and maintain consistency.
