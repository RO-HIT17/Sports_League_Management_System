# **Sports League Management System**

The **Sports League Management System** is a robust platform designed to simplify and streamline the management of sports leagues. It caters to various user roles: **Players**, **Team Managers**, **League Managers**, and **Admins**, providing tailored functionalities to manage players, teams, matches, and league operations efficiently.

---

## **Features**

### **Core Functionalities**
1. **Authentication and Role Management**
   - Secure login and registration system.
   - Role-based access control tailored for Players, Team Managers, League Managers, and Admins.

2. **Player Management**
   - Manage personal profiles and stats.
   - View squad details and track individual match performance.

3. **Team Management**
   - Register teams and manage player rosters.
   - Monitor team performance and upcoming matches.

4. **League Management**
   - Schedule matches and approve team registrations.
   - Update match results and manage league standings.

5. **Admin Oversight**
   - Full control over users, leagues, teams, and matches.
   - Comprehensive analytics for aggregated and detailed statistics.
   - Tools to execute SQL queries, stored procedures, and monitor database triggers.

---

## **Technology Stack**

### **Frontend**
- **Framework**: Next.js 14 (App Directory)
- **Styling**: Tailwind CSS
- **UI Components**: NextUI v2, Tailwind Variants
- **Language**: TypeScript
- **Animations**: Framer Motion
- **Theme Management**: next-themes

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with `pg-promise`
- **Authentication**: JSON Web Tokens (JWT)

### **Development Tools**
- **Version Control**: Git with GitHub
- **Package Managers**: npm

---

## **User Roles and Pages**

### **Players**
- **Dashboard**: View matches, standings, and team updates.
- **Squad View**: Access team roster and squad details.
- **Player Profile**: Manage personal information and stats.

### **Team Managers**
- **Dashboard**: Monitor team performance and upcoming matches.
- **Team Management**:
  - Add or remove players.
  - Register teams in leagues.
- **Match Overview**: Access team match schedules and results.

### **League Managers**
- **Dashboard**: Approve teams, manage matches, and oversee leagues.
- **Match Scheduling**:
  - Schedule and update matches.
- **Results Management**: Enter match results and track standings.
- **League Standings**: Monitor team rankings in real time.

### **Admins**
- **Dashboard**: Manage users, leagues, teams, and matches.
- **Data Analysis**:
  - Generate aggregated stats and manage logs.
- **Database Management**:
  - Execute SQL queries, stored procedures, and monitor triggers.

---

## **Installation**

### **Prerequisites**
- Node.js (v16 or newer)
- npm
- PostgreSQL (v13 or newer)

---

### **1. Clone the Repository**
```bash
git clone https://github.com/RO-HIT17/Sports_League_Management_System.git
cd Sports_League_Management_System
```

### **2. Backend Setup**
Navigate to the backend directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Configure environment variables in a `.env` file:
```env
DB_HOST=<database_host>
DB_USER=<database_user>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
JWT_SECRET=<jwt_secret>
```



Start the server:
```bash
npm start
```
The backend server will run on `http://localhost:5000`.

---

### **3. Frontend Setup**
Navigate to the frontend directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Configure environment variables in a `.env` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```
The frontend application will run on `http://localhost:3000`.

---

## **Usage**

### **Authentication**
- **Players**: Register and log in to view personal dashboards and squad details.
- **Team Managers**: Manage team registrations, players, and match schedules.
- **League Managers**: Approve teams, schedule matches, and update results.
- **Admins**: Manage all entities, analyze data, and execute SQL queries.

---

## **Project Structure**

### **Frontend**
- `/client/app`: Next.js pages and components.
- `/client/components`: Reusable UI components.
- `/client/styles`: Tailwind CSS and custom styles.
- `/client/assets`: Static files like images.

### **Backend**
- `/server/src/controllers`: Route handlers.
- `/server/src/routes`: API routes.
- `/server/src/config`: Configuration files (e.g., database setup).

---

## **SQL Query Integration**
- **Simple Queries**: Predefined queries for quick data retrieval.
- **Aggregate Queries**: Generate reports for teams, players, and leagues.
- **Join Queries**: Explore relationships between players, teams, and leagues.
- **Triggers**: Monitor and log database changes.
- **Stored Procedures**: Execute reusable SQL procedures for specific tasks.
- **User-Defined Functions**: Custom functions for complex operations.

---

## **Development Notes**

### **Environment Variables**
Ensure all necessary environment variables are set in `.env` files for both the frontend and backend.

---

## **Future Enhancements**
- **Calendar Integration**: Sync match schedules with Google Calendar.
- **Advanced Analytics**: Add player heatmaps and performance trends.
- **Mobile App**: Build a mobile-friendly version for players and managers.

---
