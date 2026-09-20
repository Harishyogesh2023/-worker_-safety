# SiteSafe AI

SiteSafe AI is a construction safety management web application developed as a hackathon project and presented as part of the innovation ecosystem at NIT Trichy. The platform is designed to improve workplace safety by helping workers complete PPE compliance checks, report hazards in real time, and give site managers a centralized view of safety activity.

The project focuses on solving a practical problem in construction environments: safety checks are often manual, inconsistent, and difficult to monitor across large work sites. SiteSafe AI brings a simple, user-friendly digital workflow to manage those checks more efficiently and transparently.

## Project Overview

SiteSafe AI combines modern web interfaces with AI-assisted image analysis to support on-site safety operations. Workers can validate required protective equipment such as helmets, gloves, and safety shoes, while managers can review reports, monitor compliance, and manage site protocols from a central dashboard.

This solution demonstrates how AI and front-end technologies can be used to strengthen operational safety, reduce risk, and create more accountable systems for construction teams.

## Why This Project Matters

Construction sites involve high-risk work conditions where employees are exposed to hazards such as falling objects, unsafe equipment use, moving vehicles, and inadequate protective gear. In many situations, safety checks still rely on manual inspections or delayed reporting methods.

SiteSafe AI addresses this by creating a digital safety workflow that:

- supports worker self-checks before site entry
- allows quick hazard reporting from the field
- helps managers stay informed about active safety issues
- provides an organized system for tracking compliance and audits

## Hackathon Context

This project was developed as a hackathon submission and reflects a strong focus on solving a real-world industry challenge with a practical, impactful product concept. The work was created during participation at NIT Trichy, where the goal was to build an intuitive safety-focused solution that could demonstrate both technical innovation and social value.

## Core Features

- Worker and manager role-based login flow
- PPE verification workflow for helmets, gloves, and shoes
- AI-assisted image assessment using TensorFlow.js and COCO-SSD
- Voice-based hazard reporting using browser speech recognition
- Manual text reporting for hazards and unsafe conditions
- Manager dashboard with live safety alerts and compliance statistics
- Audit log tracking for site safety actions
- Safety protocol management panel for administrators
- Responsive interface for desktop and mobile usage

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- TensorFlow.js
- COCO-SSD Object Detection
- Browser Speech Recognition API

## System Workflow

### Worker Flow

1. A worker logs in to the worker dashboard.
2. The worker completes PPE verification tasks by uploading images.
3. The application analyzes the image using object detection to estimate task compliance.
4. The worker can report hazards either by voice input or by typing a report.
5. Safety records and compliance updates are tracked for manager review.

### Manager Flow

1. A manager logs in to the dashboard.
2. The dashboard displays live hazard alerts and safety checks.
3. The manager reviews audit records and site compliance trends.
4. Safety protocols can be updated or managed from the control panel.

## Project Structure

```text
.
├── index.html          # Main app shell
├── app.js              # Application logic and dashboard flows
├── styles.css          # UI styling and responsive design
├── package.json        # Project metadata and scripts
├── exindex.html        # Reference prototype / earlier hackathon iteration
├── README.md           # Project documentation
└── LICENSE             # Optional license file if added later
```

## Local Setup

### Prerequisites

- Modern web browser
- Python 3.x (for running the local server)
- Internet access for CDN-based libraries

### Run the Project

```bash
npm install
npm run start
```

Then open the app in your browser:

```text
http://localhost:8000
```

You can also run it directly without npm:

```bash
python3 -m http.server 8000
```

## Future Scope

The current version is a functional prototype focused on proving the concept and demonstrating the workflow. In future iterations, the application can be expanded with:

- secure authentication and user management
- persistent backend storage for incidents and compliance logs
- real-time cloud-based dashboards
- predictive risk analytics
- integration with IoT devices and site sensors
- enterprise deployment for large-scale construction operations

## Impact

SiteSafe AI aims to improve safety culture in construction environments by reducing manual effort, encouraging faster reporting, and making safety compliance more measurable and transparent. It is a practical solution built around a meaningful real-world problem and demonstrates the value of AI-driven digital transformation in industrial settings.

## Project Description (Short Form)

SiteSafe AI is a construction safety management platform designed to help workers and managers improve site safety through PPE verification, hazard reporting, and compliance tracking. Built as a hackathon project during participation at NIT Trichy, the platform demonstrates how AI-powered web technologies can be used to create safer and more efficient construction operations.

## License

This project is currently shared as a prototype for learning, demonstration, and further development.
