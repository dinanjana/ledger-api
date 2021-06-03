# ledger-api

## Getting Started

First, install the dependencies:
```bash
npm install
```

*Set enviornment variables described in .env.example*
Tested for node js version >= 10 

## API Documentation
https://app.swaggerhub.com/apis/dinanjana6/ledger-api/1.0.0

### Sample request
http://{HOST}/ledger?start_date=2000-01-02&end_date=2099-03-18&frequency=WEEKLY&weekly_rent=324

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

## Assumptions
* Start date and end date are on property time zone

## Test coverage

------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------|---------|----------|---------|---------|-------------------
All files   |   97.44 |       95 |   86.67 |   97.39 |                   
 app        |   81.25 |        0 |      60 |   81.25 |                   
  index.js  |   81.25 |        0 |      60 |   81.25 | 23-25             
 ...lewares |     100 |      100 |     100 |     100 |                   
  ...are.js |     100 |      100 |     100 |     100 |                   
 controller |     100 |      100 |     100 |     100 |                   
  index.js  |     100 |      100 |     100 |     100 |                   
 logic      |     100 |      100 |     100 |     100 |                   
  ...nts.js |     100 |      100 |     100 |     100 |                   
  Rents.js  |     100 |      100 |     100 |     100 |                   
  Terms.js  |     100 |      100 |     100 |     100 |                   
 service    |     100 |    97.62 |     100 |     100 |                   
  ...ice.js |     100 |      100 |     100 |     100 |                   
  ...ice.js |     100 |    97.44 |     100 |     100 | 66                
------------|---------|----------|---------|---------|------------------
