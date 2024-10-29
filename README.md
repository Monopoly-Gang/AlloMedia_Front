# AlloMedia Delivery Application

## Overview

AlloMedia is a comprehensive food delivery platform built with React, featuring multiple user roles, real-time notifications, and a responsive design supporting both light and dark modes.

[View Project Repository](https://github.com/Monopoly-Gang/AlloMedia_Front/tree/develop)

## Features

### User Roles

- **Client**
  - Search restaurants and browse menus
  - Place and track orders
  - Manage shopping cart
  - View order history

- **Delivery Driver**
  - Receive real-time delivery notifications
  - Accept/decline delivery requests
  - Track delivery routes
  - Update delivery status

- **Restaurant Manager**
  - Manage menu items
  - Process incoming orders
  - Track restaurant performance
  - Manage restaurant profile

- **Super Admin**
  - Approve restaurant registrations
  - Manage user accounts
  - System-wide monitoring
  - Generate reports

### Key Features

- **Authentication & Authorization**
  - Role-based access control
  - Protected routes
  - JWT authentication

- **Real-time Updates**
  - Order notifications
  - Delivery tracking
  - Status updates

- **Multi-language Support**
  - i18n integration
  - RTL support
  - Multiple locale options

## Technical Stack

### Frontend
- React 18.3
- Redux Toolkit
- React Router 6
- Tailwind CSS
- DaisyUI
- Framer Motion

### State Management
- Redux
- Redux Toolkit
- Context API

### UI/UX
- Responsive design
- Dark/Light mode
- RTL support
- Tailwind CSS
- Framer Motion animations

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
## Visuals

Here are images showing the application in both light and dark modes on web and mobile:

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

## Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Monopoly-Gang/AlloMedia_Front.git
cd AlloMedia_Front
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Contributing

### Collaborators

- [Anass-Dr](https://github.com/Anass-Dr)
- [aymanebs](https://github.com/aymanebs)
- [elFilaly001](https://github.com/elFilaly001)
- [erbaiy](https://github.com/erbaiy)

### Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Project Management

This project is managed using [Jira](https://elfilalyabdeljalil.atlassian.net/jira/software/projects/AF/boards/8?assignee=712020%3A8ef2c359-69f0-405b-8c01-16a30a2a3c40).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/Monopoly-Gang/AlloMedia_Front](https://github.com/Monopoly-Gang/AlloMedia_Front)

## Acknowledgments

- React Team
- Redux Team
- Tailwind CSS Team
- All contributors who have helped this project grow

---

Made with ❤️ by the AlloMedia Team
```
