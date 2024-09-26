# api-auth-sentinel

This repository demonstrates how to implement middleware authentication in an Express.js API on Node.js using custom middleware functions. It includes examples of using different authentication strategies, such as token-based authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
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

## Building the Project

1. Build the project files:
   `npm run build`

2. Start the server:
   `npm start`

##### Alternatively
1. You can run and build the server in one step:
   ` npm run build-and-start`


## Testing

- To run tests, use:
   `npm test`
- This will execute all the test files and generate a code coverage report.


##### Reviewing Code Coverage

The code coverage report is generated in the coverage directory. You can view the HTML report by opening `coverage/lcov-report/index.html` in your browser.

## Scripts

- `npm run build`: Compiles the TypeScript files into JavaScript.
- `npm start`: Runs the compiled JavaScript files using Node.js.
- `npm run build-and-start`: Compiles the TypeScript files and then starts the server.
- `npm test`: Runs the tests and generates a coverage report.

## License

The MIT License (MIT)

Copyright (c) 2023 Jake McCoy

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software", within this repository), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
