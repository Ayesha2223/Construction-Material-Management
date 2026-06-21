# Construction Material Management System

## Project Overview

The Construction Material Management System is a web-based application developed using Django and SQLite3. The system is designed to streamline the management of construction materials, employees, tasks, inventory, service requests, and internal communication within a construction organization.

The platform helps administrators and employees efficiently manage construction operations through a centralized system. It provides functionality for managing materials, monitoring employee activities, assigning tasks, handling service requests, and maintaining records.

---

## Features

### Material Management

- Add new construction materials
- Update existing material details
- Delete material records
- Track material inventory
- Manage material availability
- View complete material catalog

### Employee Management

- Employee registration
- Employee profile management
- Employee verification process
- Department allocation
- Position management
- Hire date tracking
- Active and inactive employee management

### Task Management

- Create tasks
- Assign tasks to employees
- Track task progress
- Department-wise task assignment
- Position-based task allocation

### Timesheet Management

- Log daily work hours
- Maintain employee timesheets
- Monitor employee activities
- Store attendance records

### Service Request Management

- Create service requests
- Categorize service requests
- Manage request workflow
- Track request status

### Internal Messaging

- Employee communication system
- Message management
- Internal notifications

### Authentication and Security

- User Registration
- User Login
- User Logout
- Session Management
- Django Authentication System

### Administrative Dashboard

- Material Monitoring
- Employee Monitoring
- Task Monitoring
- Service Request Monitoring
- Centralized Administration Panel

---

## Application Screenshots

### Home Page

<img width="1430" height="855" alt="image" src="https://github.com/user-attachments/assets/5a29f558-d6fe-4324-92e2-f89d718c4415" />


Description:
Main landing page of the application displaying project information and navigation options.

---

### Login Page

<img width="1375" height="751" alt="image" src="https://github.com/user-attachments/assets/e0e7d0ed-e6e9-4625-bbeb-3b6c37027eb5" />


Description:
Secure login page for administrators and employees.

---

### Registration Page

<img width="1410" height="865" alt="image" src="https://github.com/user-attachments/assets/381d20bd-b0cc-4810-8217-aace3cec8acc" />


Description:
User registration form for new employee accounts.

---


### Material Management

<img width="1352" height="902" alt="image" src="https://github.com/user-attachments/assets/0b0e5125-a715-40b9-8f42-da878122dfaf" />


Description:
Interface for managing construction materials and inventory records.

---


### Service Request Management

<img width="1331" height="910" alt="image" src="https://github.com/user-attachments/assets/97a1047f-cb8f-47d1-a196-43000a0af422" />

Description:
Module for managing construction-related service requests.

---

### Admin Panel

<img width="1907" height="678" alt="image" src="https://github.com/user-attachments/assets/d711f85d-3082-4be5-bdde-d921d4451ef4" />


Description:
Django administration panel used for complete system management.

---

## Technology Stack

| Technology | Purpose |
|------------|----------|
| Python | Backend Development |
| Django | Web Framework |
| SQLite3 | Database Management |
| HTML5 | Frontend Structure |
| CSS3 | Styling |
| Bootstrap | Responsive Design |
| JavaScript | Client-side Functionality |
| Git | Version Control |
| GitHub | Repository Hosting |

---

## Project Structure

```text
Construction-Material-Management/
│
├── construction_material_management/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── materials/
│   ├── migrations/
│   ├── static/
│   ├── templates/
│   ├── models.py
│   ├── views.py
│   ├── forms.py
│   └── admin.py
│
├── media/
│
├── screenshots/
│
├── manage.py
│
└── db.sqlite3
```

---

## System Requirements

- Python 3.10 or higher
- Django 4.x or higher
- Git
- GitHub Account
- Modern Web Browser

---

## Installation and Local Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/Ayesha2223/Construction-Material-Management.git
```

### Step 2: Move into Project Directory

```bash
cd Construction-Material-Management
```

### Step 3: Create Virtual Environment

```bash
python -m venv venv
```

### Step 4: Activate Virtual Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Linux / macOS

```bash
source venv/bin/activate
```

### Step 5: Install Django

```bash
pip install django
```

OR

```bash
pip install -r requirements.txt
```

### Step 6: Apply Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 7: Create Superuser

```bash
python manage.py createsuperuser
```

### Step 8: Run Development Server

```bash
python manage.py runserver
```

### Step 9: Open Application

```text
http://127.0.0.1:8000/
```

---

## Admin Panel Access

Open:

```text
http://127.0.0.1:8000/admin/
```

Login using the superuser credentials created during setup.

---

## Database

The application uses SQLite3 as the default database.

Database File:

```text
db.sqlite3
```

---

## Available Modules

### Administrator

- Manage Employees
- Manage Materials
- Manage Tasks
- Manage Service Requests
- Manage Timesheets
- Verify Employees
- View System Records

### Employee

- Login to System
- Update Profile
- View Assigned Tasks
- Log Working Hours
- Send Messages
- Create Service Requests

---

## Future Enhancements

- Supplier Management Module
- Purchase Order Management
- Advanced Reporting System
- Email Notifications
- SMS Notifications
- Material Forecasting
- Cloud Deployment
- REST API Integration
- Mobile Application Support
- Analytics Dashboard

---

## Author

### Ayesha Nakhwa

Bachelor of Science in Computer Science

Project Developed Using:

- Python
- Django
- SQLite3
- HTML
- CSS
- Bootstrap
- JavaScript

---

## License

This project has been developed for educational and academic purposes.

Copyright © Ayesha Nakhwa

All Rights Reserved.

Description:
Employee profile management and verification module.
