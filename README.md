﻿# NotesApp - Simple Notes API (Backend)

A basic backend for a Note-Taking app with user authentication and notes management.

## Features

- User registration and login (JWT-based authentication)
- Passwords are hashed with bcrypt
- Protected notes routes (only logged-in users can access)
- Add and list notes for the logged-in user

## Tech Stack

- Node.js, Express
- MongoDB, Mongoose
- JWT, bcrypt
- mailgen,nodemailer

## Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/KshitizRana/NotesApp.git
   cd NotesApp
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables in a `.env` file:**

4. **Start the server:**
   ```bash
   npm run start
   ```

## API Endpoints

### Auth

- `POST /api/v1/auth/register`  
  Body:
  ```
  {
      "fullname": "John",
      "email": "john@example.com",
      "password": "yourpassword"
  }
  ```

- `POST /api/v1/auth/verify/:token`

  - params: `{ token }`

- `POST /api/v1/auth/login`  
  Body:
  ```
  {
     "email": "john@example.com",
      "password": "yourpassword"
  }
  ```  
  Returns: `{ "token": "JWT_TOKEN" }`

### Notes (Protected: require JWT in Authorization header)

- `POST /api/v1/notes/create-notes`  
  Body:
  ```
  {
      "title": "Note Title",
      "content": "Note content"
  }
  ```

- `GET /api/v1/notes/get-notes`  
  Returns: List of notes for the logged-in user

## API Usage

## Postman Collection: [Collection](https://www.postman.com/avionics-specialist-71064450/workspace/postman-api-fundamentals-student-expert/collection/32402229-453ce995-d542-42dd-8c51-d7435fbf0ee8?action=share&source=copy-link&creator=32402229)

- Register
    <img width="1095" height="757" alt="Screenshot 2025-07-14 184651" src="https://github.com/user-attachments/assets/46113c88-0821-4eee-b424-a4adddef4706" />

   - Verification Mail
        <img width="1337" height="798" alt="image" src="https://github.com/user-attachments/assets/5a3bbea3-8a8e-4cc1-a7a7-5e6b2ccec09f" />

- Verify Email
  <img width="1085" height="764" alt="image" src="https://github.com/user-attachments/assets/87846128-3cd4-4c99-8e58-6f36f0059edb" />

- Login
   <img width="1093" height="739" alt="image" src="https://github.com/user-attachments/assets/54c50650-cbd7-43b3-b3f5-c5bc53170db4" />
- JWT tokens set
   <img width="1091" height="527" alt="image" src="https://github.com/user-attachments/assets/048e6685-b60e-47f2-bf59-1fc241132e60" />

- Create Notes
  <img width="1083" height="719" alt="image" src="https://github.com/user-attachments/assets/a6a04f68-1c06-4983-bd49-1a8f8d95eaab" />
  
- Get Notes
  <img width="1087" height="744" alt="image" src="https://github.com/user-attachments/assets/de52f5fa-8f84-4e00-b88c-40f7d470333e" />



 
