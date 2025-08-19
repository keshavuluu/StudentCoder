# Hackathon Tracker

A MERN stack application for tracking and managing hackathons.

## Features

- Add new hackathons with details like:
  - Hackathon name
  - College name
  - Location
  - Registration fee (paid/free)
  - Maximum team size
  - Hackathon image
- View list of all hackathons
- Responsive design

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
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hackathon-tracker
   ```

4. Create an uploads directory in the backend folder:

   ```bash
   mkdir uploads
   ```

5. Start the backend server:
   ```bash
   npm run dev
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

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Use the form to add new hackathons
3. View the list of all hackathons below the form

## Technologies Used

- Frontend:

  - React
  - Axios
  - CSS3

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Multer (for file uploads)

## Project Structure

```
hackathon-tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── index.js
    └── package.json
```