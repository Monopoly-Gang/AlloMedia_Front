Certainly! Here's an updated README with a detailed project description, including a well-styled folder structure:

---

# AlloMedia Delivery Application

## Overview

This project is a delivery application developed with React, focusing on user authentication and order management. It includes features for clients, delivery drivers, restaurant managers, and super admins.

## Project Structure

```
📦 AlloMedia_Front/
├── 📂 public/
│   ├── 📄 manifest.json
│   └── 📂 locales/
│       ├── 📂 fr/
│       │   └── 📄 translation.json
│       ├── 📂 it/
│       │   └── 📄 translation.json
│       ├── 📂 en/
│       │   └── 📄 translation.json
│       ├── 📂 ja/
│       │   └── 📄 translation.json
│       └── 📂 ae/
│           └── 📄 translation.json
│
├── 📂 src/
│   ├── 📂 assets/
│   │   └── 📂 img/
│   │       ├── 📄 app-illustration.svg
│   │       ├── 📄 apple-logo.svg
│   │       ├── 📄 google-play.svg
│   │       ├── 📄 home-illustration.svg
│   │       ├── 📄 services1-illustration.svg
│   │       ├── 📄 services2-illustration.svg
│   │       └── 📄 services3-illustration.svg
│   │
│   ├── 📂 components/
│   │   ├── 📂 icons/
│   │   │   ├── 📄 IconFacebook.jsx
│   │   │   ├── 📄 IconGoogle.jsx
│   │   │   ├── 📄 IconInstagram.jsx
│   │   │   ├── 📄 IconX.jsx
│   │   │   ├── 📄 MaterialSymbolsDashboardCustomizeRounded.jsx
│   │   │   ├── 📄 MaterialSymbolsLightOrderApprove.jsx
│   │   │   ├── 📄 Restaurant.jsx
│   │   │   └── 📄 SolarMenuDotsSquareBold.jsx
│   │   │
│   │   ├── 📂 layout/
│   │   │   ├── 📂 Dashboard/
│   │   │   │   ├── 📄 DefaultLayout.jsx
│   │   │   │   ├── 📄 Header.jsx
│   │   │   │   ├── 📄 RestaurantManagerSidebar.jsx
│   │   │   │   ├── 📄 Setting.jsx
│   │   │   │   └── 📄 Sidebar.jsx
│   │   │   │
│   │   │   └── 📂 Interface/
│   │   │       ├── 📄 Footer.jsx
│   │   │       └── 📄 Header.jsx
│   │   │
│   │   ├── 📄 DeliveryTracking.jsx
│   │   ├── 📄 HeroSection.jsx
│   │   ├── 📄 ServiceCards.jsx
│   │   └── 📄 Dashboard.jsx
│   │
│   ├── 📂 pages/
│   │   ├── 📂 auth/
│   │   │   ├── 📄 Login.jsx
│   │   │   └── 📄 RegisterClient.jsx
│   │   ├── 📄 Home.jsx
│   │   └── 📄 OrderTracking.jsx
│   │
│   ├── 📄 App.css
│   ├── 📄 main.jsx
│   ├── 📄 tailwind.css
│   └── 📄 theme.config.jsx
│
├── 📄 index.html
├── 📄 package.json
├── 📄 README.md
└── 📄 tailwind.config.js
```

## Features

### Authentication

- **Registration**: Users can create an account with validation for email and password.
- **Login**: Secure login with error handling for incorrect credentials.
- **Password Reset**: Request and set a new password via email link.
- **Logout**: Clears session data securely.

### User Roles

- **Client**: Search restaurants, view menus, place orders, and track deliveries.
- **Delivery Driver**: Receive and confirm deliveries.
- **Restaurant Manager**: Manage menu items and orders.
- **Super Admin**: Approve restaurant registrations and manage restaurant data.

## Visuals

### Web

- **Light Mode:**

  ![Web Light Mode](document/img/web-light.png)

- **Dark Mode:**

  ![Web Dark Mode](document/img/web-dark.png)

### Mobile

<div align="center">
  <table style="border: none;">
    <tr>
      <td style="border: none; text-align: center;">
        <h4>Light Mode</h4>
        <img src="document/img/mobile-light.png" alt="Mobile Light Mode" width="200">
      </td>
      <td style="border: none; text-align: center;">
        <h4>Dark Mode</h4>
        <img src="document/img/mobile-dark.png" alt="Mobile Dark Mode" width="200">
      </td>
    </tr>
  </table>
</div>

## Prerequisites

- Node.js (version 20 or higher)
- Docker and Docker Compose

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/elmorjanimohamed9/AlloMedia-Frontend-Auth
   cd AlloMedia-Frontend-Auth
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file at the root of the project and add the necessary variables, such as the backend API URL and secret keys.

## Usage

1. **Start the application:**

   ```bash
   npm start
   ```

2. **Access the application:**
   Open your browser and go to `http://localhost:5173`.

## Dockerization

1. **Build the Docker image:**

   ```bash
   docker build -t react-app .
   ```

2. **Start the containers with Docker Compose:**

   ```bash
   docker-compose up
   ```

3. **Access the application:**
   Open your browser and go to `http://localhost:5173`.

## Libraries and Frameworks

- **Frontend**: React, React Router, Axios, Redux (optional)
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB (NoSQL)
- **Authentication**: JSON Web Tokens (JWT)
- **Real-time Notifications**: WebSocket (Socket.IO)
- **Geolocation**: Google Maps API (optional)

## Contribution

Contributions are welcome. Please submit a pull request for any improvements or corrections.

## Authors

- **Elmorjani Mohamed** - [My GitHub Profile](https://github.com/elmorjanimohamed9)

---

For more details, check our [complete documentation](https://elmorjanimohamed.atlassian.net/jira/software/projects/AFA/boards/4).

---

[![Jira Logo](https://upload.wikimedia.org/wikipedia/commons/8/82/Jira_%28Software%29_logo.svg)](https://elmorjanimohamed.atlassian.net/jira/software/projects/AFA/boards/4)

---

This README provides a comprehensive overview of the project, including its structure, features, and setup instructions.
