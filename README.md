# Recipes Ecommerce API Version 1.0.0
The market-backend exposes CRUD API endpoint for the market-frontend application.

## Technologies
| Name | Version | Description |
|------|---------|-------------|
| `Nodejs` | 18.15.0 | JavaScript Compiler  Engine for the server side |
| `TypeScript` | 5.0.2 | JavaScript type checker |
| `ts-node` | 10.9.1 | TypeScript for Nodejs |
| `lodash` | 4.17.21 | This is use to merge attributes to the request object |
| `express` | 4.18.2 | This is used for the HTTP routes |
| `mongoose` | 7.0.2 | This is used to manage the mongoDB connections and data modeling |

## Exposed End Points
| End Point | Request Type | Response Type | Payload |
|-----------|--------------|---------------|---------|
| `/auth/login` | POST | Object | Username and password |
| `/auth/register` | POST | String | Username and password |
| `/users` | GET | Object | Null |
| `/users/<id>` | GET | Object | User ID |
| `/users/<id>` | PATCH | Object | User ID |
| `/users/<id>` | DELETE | Object | User ID |


## Installation
* Setup mongoDB locally or remotely, and change line 26 with your mongoDB URL
`const MONGODB_URL = '<mongoDB-URL>'`
* Clone the project `market-backend`['https://github.com/malishben360/market-backend.git']
`git clone <git-repository>`
* Change directory
`cd market-backen`
* Install all the required dependencies
`npm install`
* Run the application
`npm run start`*******


## Contributors
| Full Name | Email Address | Profile |
|-----------|---------------|---------|
| Elisha Benjamin | malishben360@gmail.com | `FullStack Developer`['https://github.com/malishben360'] |