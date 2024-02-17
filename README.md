# CSE341-Final-Project-Team-s

# Task Manager API

A RESTful API for managing tasks with authentication using JSON Web Tokens (JWT) and MongoDB. 

## Table of Contents

- [Task Manager API](#task-manager-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Clone the Repository](#clone-the-repository)
    - [Install Dependencies](#install-dependencies)
    - [Configure MongoDB](#configure-mongodb)
  - [Configuration](#configuration)
  - [Usage](#usage)
    - [Start the Application](#start-the-application)
    - [API Documentation](#api-documentation)

## Description

Task Manager API is a Node.js application that provides RESTful endpoints for managing tasks through CRUD operations. It includes user authentication using JSON Web Tokens (JWT) and stores task data in a MongoDB database.

## Features

- User registration and authentication (OAuth)
- CRUD operations for tasks (GET, POST, PUT, DELETE)
- Secure endpoints using JWT authentication
- MongoDB for persistent data storage

## Technologies Used

- Node.js
- Express
- MongoDB (using Mongoose)
- JSON Web Tokens (JWT)
- Swagger.js

## Installation

### Clone the Repository

bash

git clone https://github.com/EddSanJu/CSE341-Final-Project-Team-s


### Install Dependencies

Nodemon is required to run the project

bash


cd CSE341-Final-Project-Team-s
npm install
npm install -g nodemon




### Configure MongoDB

Ensure MongoDB is installed and running. Update the database connection details in the configuration env file if necessary.

## Configuration

Make any necessary configuration changes in the config.js file, such as database connection details and JWT secret.

## Usage


### Start the Application

bash

npm run start


The app by default is running on the port 3000 

http://localhost:3000


### API Documentation

if you want to see the Api Documentation please enter into the next route ( the app must be running ), the api documentation is available through Swagger UI

http://localhost:3000/api-docs

<!-- ### Register a New User

To register a new user, send a POST request to /api/users with the required user details in the request body.

### Obtain Authentication Token

To obtain an authentication token, send a POST request to /api/auth/login with valid credentials. The token will be included in the response.

### Make Authenticated Requests

Include the obtained token in the Authorization header of your requests using the Bearer token format. -->

<!-- ## API Endpoints

To see the Api Endpoints please refer to Swagger.


## Authentication

This API uses JSON Web Tokens (JWT) for authentication. Include the obtained token in the Authorization header of authenticated requests. -->
