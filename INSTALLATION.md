
---

# Installation Guide for Multiplayer UNO Game

This guide will walk you through the steps to install and run the Multiplayer UNO Game project on your local machine.

## Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- [Node.js and npm](https://nodejs.org/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (either installed locally or using a cloud service like MongoDB Atlas)
- [Git](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

First, clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/yourusername/multiplayer-uno.git
cd multiplayer-uno
```

### 2. Set Up the Backend

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secret key for JWT authentication.

4. Start the backend server:

    ```bash
    npm start
    ```

   The backend server should now be running on `http://localhost:5000`.

### 3. Set Up the Frontend

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory if needed for any configuration.

4. Start the frontend development server:

    ```bash
    npm run dev
    ```

   The frontend application should now be running on `http://localhost:5173`.

## Running the Application

With both the backend and frontend servers running, open your browser and navigate to `http://localhost:5173` to access the UNO game. You should be able to sign up, log in, create or join game rooms, and start playing.

## Troubleshooting

If you encounter any issues during installation, consider the following steps:

- **Check Dependencies**: Ensure that all dependencies are installed correctly by running `npm install` in both the `backend` and `frontend` directories.
- **Environment Variables**: Ensure that your `.env` file contains the correct values for your MongoDB connection string and JWT secret.
- **Server Logs**: Check the terminal output for any error messages from the backend or frontend servers.
- **Port Conflicts**: Make sure that ports `5000` (backend) and `5173` (frontend) are not being used by other applications.

## Contact

If you have any questions or need further assistance, please open an issue on the GitHub repository or contact us via [Email](shivansh111sid@gmail.com).

Thank you for installing and contributing to the Multiplayer UNO Game project!

---
