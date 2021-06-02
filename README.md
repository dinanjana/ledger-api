# ledger-api

## Getting Started

First, install the dependencies:
```bash
npm install
```

Set enviornment variables described in .env.example

## Commands

Run in development mode
```bash
npm run dev
```

Run in production mode
```bash
npm start
```

Run unit tests + integration tests in watch mode
```bash
npm run test:watch
```

Run unit tests + integration tests
```bash
npm test
```

Get test coverage
```bash
npm run test:coverage
```
Run eslint
```bash
npm run eslint
```
API will be available on [http://localhost:{PORT}]

## Directory structure
| root
| |src - src of the app
| | |app - application definition
| | |controller - URL path to service map
| | |logic - Business logic
| | |service - Services that manipulates entities
| |test
| | |logic - Unit tests for business logic functions
| | |integration-test - API integration tests