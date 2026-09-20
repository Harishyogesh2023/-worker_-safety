# SiteSafe AI

SiteSafe AI is a construction safety management platform designed to improve worker protection, streamline hazard reporting, and provide managers with real-time visibility into site safety compliance.

This project began as a hackathon frontend prototype and has been evolved into an engineering-ready product concept for modern construction environments. It focuses on practical workplace safety workflows including PPE verification, voice-based hazard reporting, audit tracking, and manager oversight.

## Why this project matters

Construction sites are high-risk environments where workers operate around equipment, height risks, moving vehicles, and hazardous material handling. Safety incidents often happen because of inconsistent PPE compliance, delayed reporting, and poor communication between workers and supervisors. SiteSafe AI addresses this by creating a digital workflow that supports real-time action and accountability.

## Problem statement

In many construction projects, safety checks are still performed manually and inconsistently. Workers may forget mandatory PPE checks, hazards may go unreported, and managers often lack a centralized place to monitor alerts, actions, and compliance records. This leads to operational delays, increased risk, and poor auditability.

## Solution overview

SiteSafe AI provides a role-based safety management experience:

1. Workers log in and verify required PPE compliance.
2. Workers upload safety-related images for visual inspection.
3. Hazard incidents can be reported through speech or text.
4. Managers review safety alerts, compliance checks, and audit logs.
5. Safety protocols are documented and maintained through a protocol dashboard.

## Target users

- Construction workers
- Site supervisors and managers
- Safety officers
- Project operations teams

## Features

- Role-based login for managers and workers
- PPE verification workflow using uploaded images
- object detection using TensorFlow.js / COCO-SSD
- voice hazard reporting using browser speech recognition
- text-based hazard reporting for manual incident entry
- manager dashboard with live alerts and safety metrics
- audit trail for site actions and compliance review
- protocol management for safety rules and operational procedures
- responsive UI for desktop and mobile access

## Tech stack

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (Vanilla)
- TensorFlow.js
- COCO-SSD model

## Project structure

```text
.
├── index.html          # Main app entry point
├── app.js              # UI logic, state, and workflows
├── styles.css          # Design system and responsive layout
├── package.json        # Local project metadata and scripts
├── exindex.html        # Original hackathon reference file
├── README.md           # Project documentation
└── LICENSE             # Optional license placeholder if needed
```

## How it works

### Worker flow

- Sign up or log in to the worker portal.
- Upload an image to verify required PPE such as a helmet, gloves, or safety shoes.
- The app uses TensorFlow.js object detection to analyze the image and assess compliance.
- Workers can report hazards through voice recognition or manual text input.
- Once safety tasks are verified, the system records a safety check event.

### Manager flow

- Log in to the manager dashboard.
- Review live hazard notifications and safety reports.
- Monitor completed compliance checks and audit actions.
- Manage site-specific safety protocols and operational rules.

## Local setup

### Prerequisites

- Modern browser
- Python 3.x (for local static serving)
- Internet access for CDN-based libraries

### Run the project

```bash
npm install
npm run start
```

Then open:

```text
http://localhost:8000
```

You can also run it directly without npm:

```bash
python3 -m http.server 8000
```

## Product roadmap

### Phase 1: MVP safety workflow

- worker and manager login
- PPE task verification
- hazard reporting through text and voice
- manager dashboard overview

### Phase 2: Data-driven compliance

- persistent storage for users, records, and audit logs
- site and zone tracking
- historical analytics and reports

### Phase 3: AI-enhanced safety intelligence

- incident severity classification
- predictive hazard risk scoring
- more robust PPE validation models

### Phase 4: Enterprise-ready deployment

- secure login and authorization
- backend APIs and database integration
- cloud deployment and reporting tools

## Engineering value

This project is more than a static UI demo. It demonstrates practical product thinking and engineering workflow:

- role-based user flows
- operational dashboards for site oversight
- real-time reporting and auditability
- extensible frontend architecture for future backend integration
- industry-driven problem solving around workplace safety

## GitHub project description

SiteSafe AI is a construction safety management platform designed to improve worker protection, strengthen hazard reporting, and provide managers with real-time visibility into site safety and compliance. The system allows workers to validate PPE compliance through image-based checks and report hazards using voice or text. Managers can monitor safety alerts, review audit records, and manage site safety protocols from a centralized dashboard. Built as a frontend prototype and evolved into an engineering-ready concept, SiteSafe AI demonstrates how digital workflows can improve accountability, response speed, and operational safety on construction sites.

## License

This project is currently shared as an open prototype for learning, demonstration, and further engineering development.
