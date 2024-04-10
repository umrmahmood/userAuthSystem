Certainly! Below is a GitHub README for your project, including usage instructions and relevant information based on the provided code:

---

# User Management System

This project is a User Management System built using React.js for the frontend and Express.js for the backend. It allows users to sign up, log in, view profiles, and perform administrative tasks such as managing user accounts.

## Features

- **User Authentication**: Users can sign up for new accounts and log in securely using their credentials.
- **Role-based Access Control**: Differentiates between regular users and administrators, granting special privileges to admins, such as managing user accounts.
- **Admin Panel**: Administrators have access to an admin panel where they can view all users, delete user accounts, and perform other administrative tasks.
- **Profile Management**: Logged-in users can view and manage their profiles.
- **Google Login**: Users can log in using their Google accounts for added convenience.

## Installation

### Prerequisites

- Node.js installed on your machine ([Download Node.js](https://nodejs.org/))
- MongoDB installed and running ([Download MongoDB](https://www.mongodb.com/try/download/community))

### Steps

1. Clone the repository to your local machine:

   ```bash
   git clone git@github.com:umrmahmood/userAuthSystem.git
   ```

2. Navigate to the project directory:

   ```bash
   cd userAuthSystem
   ```

3. Install dependencies for both the frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

4. Set up environment variables:
   
   - Create a `.env` file in the `backend` directory.
   - Add the following variables to the `.env` file:
     ```plaintext
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/user-management
     SECRET_KEY=your_secret_key_here
     ```

5. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

6. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

7. Access the application in your browser at `http://localhost:3000`.

## Usage

- **Sign Up**: Navigate to the sign-up page (`/create-user`) and fill out the required information to create a new account.
- **Log In**: Use the login form on the homepage to log in with your credentials.
- **View Profile**: Once logged in, you can view your profile information on the profile page (`/`).
- **Admin Panel**: If you are an admin, navigate to the admin panel (`/admin-area`) to view and manage user accounts.
- **Google Login**: Click on the "Google Login" button to log in using your Google account.


