# Tailoring Service Platform Backend

## Overview

This is the backend application for a comprehensive Tailoring Service Platform. It is built using Node.js, Express, and MongoDB, and provides APIs for admins, tailors, customers, communications, and logistics.

Features include:

- Multi-tier user roles and management with verification/auditing.
- Tailor business profile & portfolio management.
- Tailor order processing with real-time status and QC checkpoints.
- Customer mobile app APIs with AI-powered tailor discovery and order placement.
- Real-time, multi-channel communication (chat, push, SMS, email).
- Logistics & deliveries with carrier integrations.
- Analytics and reporting services.
- Secure data storage and encryption for sensitive measurements.
- Localization/multilingual content and SEO management.
- Financials with UAE VAT compliance.
- Robust input validation, error handling, logging, and security.

---

## Technology Stack

- Node.js
- Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- Joi for validation
- Winston for logging
- Firebase Admin SDK (push notifications)
- Twilio (SMS gateway)
- Nodemailer (email services)
- dotenv for environment config

---

## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB server (local or Atlas)
- Firebase project/service account for push notifications
- Twilio account for SMS
- SMTP email service credentials (Gmail, SendGrid, etc.)

### Clone the repository

