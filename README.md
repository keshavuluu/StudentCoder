# StudentCoder

A MERN stack application for tracking hackathons, coding progress, and internships, designed for students aspiring for product-based companies.

## Features

- **Hackathon Tracker**

  - Users can add hackathons available in their colleges.
  - View a comprehensive list of all added hackathons.

- **Roadmap to Product-Based Companies**

  - Step-by-step roadmap for preparing for top product-based companies.
  - Guidance on coding, system design, and interview preparation.

- **Coding Leaderboard**

  - Track and compare scores across coding platforms like:
    - CodeChef
    - Codeforces
    - InterviewBit
    - LeetCode
    - GeeksforGeeks
  - View a leaderboard to compare your progress with peers.

- **Internship Portals**

  - Track applications to various internship portals.

- **Responsive Design**
  - Works seamlessly on desktop and mobile devices.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with the following content:

   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/studentcoder
   ```

4. Create an uploads directory in the backend folder:

   ```bash
   mkdir uploads
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

### Quick Build & Start

You can also use the root package.json scripts:

```bash
# Build the entire project
npm run build

# Start both backend and frontend (development)
npm start
```

## Usage

- Add hackathons available in your college.
- Follow the roadmap to prepare for product-based companies.
- Track coding scores on multiple platforms and view leaderboard rankings.
- Track internship applications.

## Technologies Used

- **Frontend:**

  - React
  - Axios
  - CSS3
  - Clerk (Authentication)

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Cron Jobs (for score updates)

## Project Structure

```
StudentCoder/
├── backend/
│   ├── jobs/           # Cron jobs for score updates
│   ├── models/         # MongoDB models
│   ├── platforms/      # Platform scrapers
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── uploads/        # File uploads
│   ├── .env           # Environment variables
│   ├── package.json
│   └── server.js      # Main server file
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── lib/       # Axios configuration
│   │   ├── store/     # State management
│   │   ├── RoadMap/   # Roadmap components
│   │   ├── App.js
│   │   └── index.js
│   ├── dist/          # Production build
│   └── package.json
├── dsasheets/         # DSA practice sheets
└── package.json       # Root package.json
```

## API Endpoints

### Hackathons

- `GET /api/hackathons` - Get all hackathons
- `POST /api/hackathons` - Add new hackathon
- `DELETE /api/hackathons/:id` - Delete hackathon

### User Profiles

- `GET /api/user-profiles/:email` - Get user profile
- `POST /api/user-profiles` - Create/update user profile

### Leaderboard

- `GET /api/leaderboard` - Get coding leaderboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For any queries or suggestions, feel free to reach out!
