## GoIT Node.js Course Template Homework

### Project Description
This repository contains a REST API backend built with Node.js. It serves as a foundation for managing user contacts, implementing authentication, and enabling CRUD operations. The project adheres to best practices in API development, making it scalable and secure.

### Key Features
User Authentication: Secure login and registration with password hashing using bcrypt and token generation via jsonwebtoken.
CRUD Operations: Fully functional Create, Read, Update, and Delete endpoints for managing user contacts.
Pagination and Filtering: Supports efficient data retrieval with pagination and query filtering.
Validation: Implements data validation with Joi to ensure the integrity of requests.
Error Handling: Centralized error management for clean and predictable responses.
Database Integration: Uses MongoDB as the database with the Mongoose ODM for schema-based data modeling.
Technologies Used
Node.js: Backend runtime environment.
Express.js: Web framework for building RESTful APIs.
MongoDB: NoSQL database for storing contact information.
Mongoose: ODM for MongoDB, enabling schema-based modeling.
Joi: Validation library for request data.
bcrypt: Password hashing for secure authentication.
jsonwebtoken: Token-based authentication.
### Installation and Setup
- Clone the repository:
`git clone https://github.com/DymitrDworakowski/nodejs-hw-rest-api.git`
- Navigate to the project directory:
`cd nodejs-hw-rest-api`
- Install dependencies:
`npm install`
- Set up environment variables in a .env file:
`MONGO_URI=<your_mongodb_connection_string>`
`JWT_SECRET=<your_secret_key>`
`PORT=3000`
- Start the server:
`npm start`

### API Endpoints
User Authentication:
- POST /auth/register: Register a new user.
- POST /auth/login: Login and receive a token.

Contacts Management:
- GET /contacts: Retrieve all contacts (with optional pagination and filtering).
- POST /contacts: Create a new contact.
- PUT /contacts/:id: Update an existing contact.
- DELETE /contacts/:id: Remove a contact.
### Project Highlights
This project demonstrates:

Proper use of middlewares for request validation and authentication.
Scalable and modular code structure for future enhancements.
Secure API design with best practices in user authentication and data handling.


