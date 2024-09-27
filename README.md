# api-auth-sentinel

This repository demonstrates how to implement middleware authentication in an Express.js API on Node.js using custom middleware functions. It includes examples of using different authentication strategies, such as token-based authentication.

## Table of Contents

- [Installation](#installation)
- [Importing Postman Collection](#importing-postman-collection)
- [Building the Project](#building-the-project)
- [Security Using Modulo](#security-using-modulo)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Scripts](#scripts)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/TheBluesBand/api-auth-sentinel.git
   cd api-auth-sentinel
   ```
2. Install Dependencies:
   `npm i`
3. Ensure you have Node.js version 20 or later installed:
   `node -v`
   `#Should output v20.x.x or later`

## Importing Postman Collection into VS Code Extension

To import the Postman collection JSON file into the Postman VS Code extension, follow these steps:

1. **Install Postman Extension**:
   - Open Visual Studio Code.
   - Go to the Extensions view by clicking on the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.
   - Search for "Postman" and install the extension.

2. **Open Postman Extension**:
   - Click on the Postman icon in the Activity Bar to open the Postman extension.

3. **Import Collection**:
   - Click on the "Import" button in the Postman extension.
   - Select the JSON file located in the [`postman`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fd%3A%2FCoding%2Fapi-auth-sentinel%2Fpostman%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22a2273ebe-ba73-4131-8322-12a05fbfd590%22%5D "d:\Coding\api-auth-sentinel\postman") directory of your project (e.g., `api-auth-sentinel/postman/your-collection.json`).
   - Follow the prompts to complete the import process.

By following these steps, you can easily import your Postman collection JSON file into the Postman VS Code extension and manage your API requests directly within Visual Studio Code. This is useful for demonstrating `auth-api-sentinal` locally.

## Building the Project

1. Build the project files:
   `npm run build`

2. Start the server:
   `npm start`

##### Alternatively

1. You can run and build the server in one step:
   ` npm run build-and-start`

## Secuirty Using Modulo

In this project, we use a simple modulo operation as a part of our token-based authentication strategy. The modulo operation helps in creating a basic form of security by ensuring that only tokens that satisfy a specific condition are considered valid.

### How It Works

1. **Token Generation**:

- A token is generated such that it satisfies a specific modulo condition. For example, a token is valid if it leaves a remainder of 3 when divided by 7.
- This is achieved using the following function:

```typescript
// Function to generate a token that satisfies the modulo condition
function generateToken(): string {
  const modulo: number = 7; // Hardcoded modulo value
  const target: number = 3; // Hardcoded target value
  let token: number;
  do {
    token = Math.floor(Math.random() * 1000000); // Generate a random number between 0 and 999999
  } while (token % modulo !== target);
  return token.toString();
}
```

2. **Token Verification**:

- When a request is made, the token provided in the `authorization` header is verified to ensure it meets the modulo condition.
- This is done using the following middleware:

```typescript
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader: string | undefined = req.headers["authorization"];
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token: number = parseInt(authHeader, 10);
  const modulo: number = 7;
  const target: number = 3;
  console.log("Token:", token);
  if (!isNaN(token) && token % modulo === target) {
    next();
  } else {
    res.sendStatus(401);
  }
};
```

### Why Use Modulo?

- **Simplicity**: The modulo operation is simple to implement and understand.
- **Basic Security**: While not a replacement for more robust security measures, using modulo can add an additional layer of validation to ensure tokens follow a specific pattern.
- **Customisable**: The modulo value and target can be easily changed to create different validation rules.

This approach demonstrates how even basic mathematical operations can be utilized to enhance security in an application.

## Testing

- To run tests, use:
  `npm test`
- This will execute all the test files and generate a code coverage report.

## Project Structure

The project structure is organized as follows:

```
api-auth-sentinel/
├── postman/
│   └── auth-api-sentinal.postman_collection.json
├── src/
│   ├── controllers.ts
│   ├── routes.ts
│   └── index.ts
├── .github/
│   └── workflows/
│       └── build-and-start.yml
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## File Descriptions

- **src/controllers.ts**: Contains the controller functions and middleware for handling requests and responses.
- **src/routes.ts**: Defines the application routes and associates them with the corresponding controller functions.
- **src/index.ts**: The entry point of the application, sets up the Express server and applies the routes.
- **.github/workflows/build-and-start.yml**: GitHub Actions workflow file to build and start the application on push.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **jest.config.js**: Configuration file for Jest, specifying how tests should be run.
- **package.json**: Contains the project metadata and dependencies.
- **README.md**: The project documentation.
- **tsconfig.json**: TypeScript configuration file.

##### Reviewing Code Coverage

The code coverage report is generated in the coverage directory. You can view the HTML report by opening `coverage/lcov-report/index.html` in your browser.

## Scripts

- `npm run build`: Compiles the TypeScript files into JavaScript.
- `npm start`: Runs the compiled JavaScript files using Node.js.
- `npm run build-and-start`: Compiles the TypeScript files and then starts the server.
- `npm test`: Runs the tests and generates a coverage report.
