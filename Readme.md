## **Sports League Management System**

For this Sports League Management System, the frontend will need pages to facilitate the four roles (Players, Team Managers, League Managers, and Admins). Here’s a breakdown of the pages, their descriptions, and how they fit into the system’s navigation structure.

### 1. **Authentication & User Management**
   - **Login Page**: Allows users to log in with their credentials.
   - **Register Page**: For Players to register and add their details to the system.
   - **User Dashboard**: Common landing page after login, with navigation based on the user role.

---

### 2. **Player Pages**
   - **Player Dashboard**: Displays player-specific information like matches, standings, and updates.
   - **Squad View**: Shows the player’s team/squad details.
   - **Player Profile**: A profile page where players can view and edit their personal information.

---

### 3. **Team Manager Pages**
   - **Team Manager Dashboard**: Displays a summary of the team’s current status, upcoming matches, and pending actions.
   - **Team Management**:
     - **Add New Player**: Allows the team manager to add new players to the team.
     - **Manage Players**: Lists players in the team with options to update or remove players.
     - **Register Team in League**: Allows team managers to register their team for specific leagues.
   - **Match Overview**: Shows all scheduled matches for the team’s registered leagues.

---

### 4. **League Manager Pages**
   - **League Manager Dashboard**: Displays league overview, pending approvals, and upcoming events.
   - **Approve Teams**: Allows league managers to approve or reject team registrations.
   - **Match Scheduling**:
     - **Schedule Matches**: Interface to schedule new matches for approved teams.
     - **View Schedule**: Lists all scheduled matches with filters for dates, teams, and leagues.
   - **Results Management**:
     - **Update Results**: Interface to input or update results after matches conclude.
     - **Match History**: Displays past matches with results and performance stats.
   - **League Standings**: Real-time standings page showing team rankings, points, and other metrics.
   - **League Management**:
     - **Manage Leagues**: View and edit league information.
     - **View All Teams**: Lists all teams registered in the league.

---

### 5. **Admin Pages**
   - **Admin Dashboard**: Overview of all leagues, matches, and user activities.
   - **League Management**:
     - **Add New League**: Admins can add new leagues and define sport types, rules, etc.
     - **Manage All Leagues**: Allows viewing and managing all leagues and teams.
   - **User Management**: Admins can view, add, update, or delete users and assign roles.
   - **Data Analysis**:
     - **Standings Overview**: A comprehensive view of standings across all leagues.
     - **Match and Player Stats**: Aggregated stats of players and teams across leagues.
   - **View Logs**: Displays action logs for auditing and tracking purposes.

---

### 6. **SQL Requirement-Based Pages**
   - **Data Query Page**:
     - **Simple Queries**: Interface for admins to execute predefined queries.
     - **Aggregate & Group Queries**: Displays aggregate results for entities like teams, players, and leagues.
   - **Join Queries Page**:
     - **Equi Join Results**: Shows data using equi-joins for team and player relationships.
     - **Outer Joins**: Page to explore outer joins, especially for incomplete match records.
   - **Stored Procedures and Functions Page**: Interface for admins to execute and review the output of stored procedures and functions.
   - **Trigger Management Page**: For admins to view trigger logs and monitor database changes.
   - **Views & Index Management**:
     - **View Management**: For viewing large datasets, optimized by database views.
     - **Index Stats**: Display usage statistics for indexed tables.

---

### **Navigation Structure**
Based on roles and the above descriptions, here’s how each user would navigate:

- **Player Navigation**:
  - Home
  - Squad View
  - Player Profile

- **Team Manager Navigation**:
  - Home (Dashboard)
  - Team Management (Add/Manage Players, Register Team)
  - Match Overview

- **League Manager Navigation**:
  - Home (Dashboard)
  - Approve Teams
  - Match Scheduling (Schedule/View Matches)
  - Results Management (Update/View Results)
  - League Standings
  - League Management

- **Admin Navigation**:
  - Home (Dashboard)
  - League Management (Add/View Leagues, View Teams)
  - User Management
  - Data Analysis (Standings, Match Stats)
  - Data Queries (Simple, Aggregate, Join)
  - Stored Procedures/Functions
  - Trigger Management
  - Views & Index Management

---

### **Total Page List**

1. Login Page
2. Register Page
3. User Dashboard
4. Player Dashboard
5. Squad View
6. Player Profile
7. Team Manager Dashboard
8. Add New Player
9. Manage Players
10. Register Team in League
11. Match Overview
12. League Manager Dashboard
13. Approve Teams
14. Schedule Matches
15. View Schedule
16. Update Results
17. Match History
18. League Standings
19. Manage Leagues
20. View All Teams
21. Admin Dashboard
22. Add New League
23. Manage All Leagues
24. User Management
25. Standings Overview
26. Match and Player Stats
27. View Logs
28. Simple Queries Page
29. Aggregate Queries Page
30. Equi Join Results Page
31. Outer Joins Page
32. Stored Procedures/Functions Page
33. Trigger Management Page
34. View Management
35. Index Stats

**Total Pages: 35**
