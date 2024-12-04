# Sports League Management System

## Introduction

The *Sports League Management System* is a comprehensive platform designed to streamline the management of sports leagues. It caters to the needs of *Players, **Team Managers, **League Managers, and **Admins* by offering tailored dashboards, efficient workflows, and detailed analytics for managing players, teams, matches, and leagues.

---

## Features

### Core Functionalities
1. *Authentication and Role Management*  
   - Role-based access for Players, Team Managers, League Managers, and Admins.
   - Secure login and registration system.

2. *Player Management*  
   - Players can manage profiles, view squad details, and track personal match statistics.

3. *Team Management*  
   - Team Managers can register teams, manage players, and monitor team performance.

4. *League Management*  
   - League Managers can schedule matches, approve team registrations, update results, and manage league standings.

5. *Admin Oversight*  
   - Full control over all entities, including leagues, teams, matches, and user roles.
   - Data analysis tools for aggregated and detailed statistics.

6. *Database Query Interface*  
   - Execute predefined SQL queries for data retrieval, including joins, aggregations, and triggers.

---

## Technology Stack

### *Frontend*
- *Framework*: AngularJS
- *Styling*: Tailwind CSS
- *Routing*: Angular Router
- *UI Components*: Custom SCSS and Tailwind

### *Backend*
- *Runtime*: Node.js
- *Framework*: Express.js
- *Language*: TypeScript
- *Database*: PostgreSQL with pg-promise
- *Authentication*: JSON Web Tokens (JWT)

### *Development Tools*
- *Containerization*: Docker
- *Version Control*: Git with GitHub
- *Languages*: TypeScript and SCSS

---

## User Roles and Pages

### *1. Players*
- *Dashboard*: View matches, standings, and team updates.
- *Squad View*: Access team roster and squad details.
- *Player Profile*: Manage personal information and stats.

### *2. Team Managers*
- *Dashboard*: Monitor team performance and upcoming matches.
- *Team Management*: Add/remove players and register teams in leagues.
- *Match Overview*: Access team match schedules and results.

### *3. League Managers*
- *Dashboard*: Approve teams, manage matches, and oversee leagues.
- *Match Scheduling*: Schedule new matches and update existing ones.
- *Results Management*: Enter results and track league standings.

### *4. Admins*
- *Dashboard*: Manage users, leagues, and teams.
- *Data Analysis*: Generate aggregated stats and manage logs.
- *Database Management*: Execute SQL queries, stored procedures, and monitor triggers.

---

## Installation

### *Prerequisites*
- *Node.js* (v16 or newer)
- *npm* or *Yarn*
- *PostgreSQL* (v13 or newer)
- *Docker* (optional, for containerized setup)

### *1. Clone the Repository*
bash
git clone https://github.com/RO-HIT17/sports-league-management-system.git
cd sports-league-management-system


### *2. Backend Setup*
1. Navigate to the backend directory:
   bash
   cd backend
   
2. Install dependencies:
   bash
   npm install
   
3. Configure environment variables in a .env file:
   env
   DATABASE_URL=postgres://username:password@localhost:5432/sports_db
   JWT_SECRET=your_jwt_secret
   
4. Run database migrations:
   bash
   npm run migrate
   
5. Start the server:
   bash
   npm start
   
   The backend server will run on http://localhost:5000.

### *3. Frontend Setup*
1. Navigate to the frontend directory:
   bash
   cd frontend
   
2. Install dependencies:
   bash
   npm install
   
3. Configure environment variables in a .env file:
   env
   API_BASE_URL=http://localhost:5000
   
4. Start the development server:
   bash
   npm start
   
   The frontend application will run on http://localhost:3000.

---

## Usage

### *Authentication*
- *Players*: Register and log in to view personal dashboards and squad details.
- *Team Managers*: Manage team registrations, players, and match schedules.
- *League Managers*: Approve teams, schedule matches, and update results.
- *Admins*: Manage all entities, analyze data, and execute SQL queries.

### *Core Operations*
- *Player Pages*: Track individual stats and view squads.
- *Team Management*: Add/remove players and register teams in leagues.
- *Match Scheduling*: Plan and update matches for approved teams.
- *Standings and Results*: Monitor rankings and input match results.

---

## Project Structure

### *Frontend*
- */src/app*: Angular modules, components, and services.
- */src/assets*: Static files like images and styles.

### *Backend*
- */src/controllers*: Route handlers.
- */src/models*: Database entities.
- */src/routes*: API routes.


---

## SQL Query Integration

- *Simple Queries*: Predefined queries for quick data retrieval.
- *Aggregate Queries*: Generate reports for teams, players, and leagues.
- *Join Queries*: Explore relationships between players, teams, and leagues.
- *Triggers*: Monitor and log database changes.
- *Stored Procedures*: Execute reusable SQL procedures for specific tasks.

---

## Future Enhancements
1. *Calendar Integration*: Sync match schedules with Google Calendar.
2. *Advanced Analytics*: Include player heatmaps and performance trends.
3. *Mobile App*: Build a mobile-friendly version for players and managers.

