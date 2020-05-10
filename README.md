# mtg

Magic the Gathering App

## Getting Started **TODO**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites **TODO**

Node.js

```
Give examples
```

### Installing **TODO**

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

To run the tests, open the root project directory in your terminal. Run `npm install` to install all necessary dependencies then run `npm test` to run automated tests.

### Break down into end to end tests **TODO**

Explain what these tests test and why

```
Give an example
```

### And coding style tests **TODO**

Explain what these tests test and why

```
Give an example
```

## Deployment **TODO**

Add additional notes about how to deploy this on a live system

## Built With

* [Express](http://expressjs.com/) - Web framework
* [Mongoose](https://mongoosejs.com/) - MongoDB ORM

* [Nodemon](https://nodemon.io/)

* [Mocha](https://mochajs.org/)
* [Chai Assertion Library](https://www.chaijs.com/)
* [SuperTest](https://github.com/visionmedia/supertest#readme)

* [cors](https://github.com/expressjs/cors#readme) - cors middleware
* [morgan](https://github.com/expressjs/morgan#readme) - Logging middleware

* [Express Handlebars](https://github.com/ericf/express-handlebars)

* [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)

* [connect-flash](https://www.npmjs.com/package/connect-flash) - For saving flash messages to the request body
* [express-session](https://github.com/expressjs/session#readme) *required for connect-flash

* [dotenv](https://github.com/motdotla/dotenv#readme)

* [passport](http://www.passportjs.org/)
* [passport-local](https://github.com/jaredhanson/passport-local#readme)

## Versioning **TODO**

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Justin Gajitos** - *Initial work* - [thirte3n](https://github.com/thirte3n)

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE Version 3 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [Brad Traversy](https://www.youtube.com/user/TechGuyWeb) - Awesome teacher

## Database Properties

* **users**
  * username - String, required, minlength: 4, maxlength: 20, trim, lowercase
  * firstName - String, required, minlength: 1, maxlength: 20
  * lastName - String, required, minlength: 1, maxlength: 20
  * password - String, required, minlength: 8, maxlength: 20
  * dateRegistered - Date, default: Date.now

## API Routes

**/api/users**
* **GET**
  * Returns json data containing an array of all users each with their own data
  * **URL Params**\
    None
  * **Data Params**\
    None
  * **Success Response**
    * Code: 200\
      Content:
      ```
      {
        "users": [
          {
            "_id": "1234567890abcdef12345678",
            "username": "Gaji"
          },
          {
            "_id": "1234567890abcdef12345679",
            "username": "Justin"
          }
        ]
      }
      ```
  * **Error Response**\
    None
  * **Sample Call**\
    `GET http://mtg.justingajitos.com/api/users HTTP/1.1`
* **POST**
  * Creates a new user. Returns json data of the newly-created user.
  * **URL Params**\
    None
  * **Data Params**
    * Required
      ```
      {
        "user" {
          "username": String, Required,
          "firstName": String, Required,
          "lastName": String, Required,
          "password": String, Minimum Length = 8, Required
        }
      }
      ```
  * **Success Response**
    * Code: 201\
      Content:
      ```
      {
        "user": {
          "isAdmin": false,
          "_id": "5e8bba635f1e73050cffc76a",
          "username": "gadj",
          "firstName": "Gadj",
          "lastName": "Gajitos",
          "password": "$2a$10$s7Dmyj/u5cWjPGsbNzGGJe3CWXH4CbTzgsZhethAJ6NGT2/T0Up0e",
          "dateRegistered": "2020-04-06T23:25:23.672Z",
          "__v": 0
        }
      }
      ```
  * **Error Response**
    * A required fields are missing or data type is incorrect
      * Code: 400\
        Content: `Bad Request`
    * Username already exists
      * Code: 400\
        Content: `Bad Request`
  * **Sample Call**
    ```
    POST mtg.justingajitos.com/api/users HTTP/1.1
    Content-Type: application/json

    {
      "user": {
        "username": "chosenone",
        "firstName": "Harry",
        "lastName": "Potter",
        "password": "ginnyweasley"
      }
    }
    ```

**/api/users/:userId**
* **GET**
  * Returns json data of a single user
  * **URL Params**
    * Required\
      `userId=[String]`
  * **Data Params**\
    None
  * **Headers**\
    `Authorization: Bearer [token]`
  * **Success Response**
    * Code: 200
      Content:
      ```
      {
        "user": {
          "isAdmin": false,
          "_id": "5e8bf8805f1e73050cffc773",
          "username": "chosenone",
          "firstName": "Harry",
          "lastName": "Potter",
          "password": "$2a$10$cyUd2NWFWI4TieMuB05tBekyiUFYnFuzTWsNX6F3iJHgW1IKxELNW",
          "dateRegistered": "2020-04-07T03:50:24.348Z",
          "__v": 0
        }
      }
      ```
  * **Error Response**
    * Username does not exist
      * Code: 404\
        Content: `Not Found`
  * **Sample Call**\
    ```
    GET http://mtg.justingajitos.com/api/users/chosenone HTTP/1.1
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhamkiLCJ1c2VySWQiOiI1ZGZlNmRiMTIxOGI4MjRmMWZkODg3ZjYiLCJpYXQiOjE1ODkxNDI3MzQsImV4cCI6MTU4OTE0NjMzNH0.-iO4B-XgDfdDinMAsn5hV3GJKK_H0Yow8GNOAT4pOdw
    ```
* **PUT**
  * Updates the user information
  * **URL Params**
    * Required\
      `userId=[String]`
  * **Data Params**
    * Required
      ```
      {
        "user": {
          "username": "chosenone",
          "firstName": "Harry",
          "lastName": "Potter",
          "password": "ginnyweasley"
        }
      }
      ```
  * **Success Response**
    * Code: 200\
      Content:
      ```
      {
        "user": {
          "isAdmin": false,
          "_id": "5e8bfeba5f1e73050cffc775",
          "username": "chosenone",
          "firstName": "Harry",
          "lastName": "Potter",
          "password": "$2a$10$9KDRyg74MtNunAStVMl5L.tiPpXxn4fPLJFT/ZEP.E8aYP3miPNa6",
          "dateRegistered": "2020-04-07T04:16:58.713Z",
          "__v": 0
        }
      }
      ```
  * **Error Response**
    * Any required payload is missing
      * Code: 400\
        Content: `Bad Request`
    * Username does not exist
      * Code: 404\
        Content: `Not Found`
  * **Sample Call**
    ```
    PUT http://mtg.justingajitos.com/api/users/chosenone HTTP/1.1
    Content-Type: application/json

    {
      "user": {
        "username": "chosenone",
        "firstName": "Harry",
        "lastName": "Potter",
        "password": "ginervaweasley"
      }
    }
    ```
* **DELETE**
  * Deletes a user
  * **URL Params**
    * Required\
      `userId=[String]`
  * **Data Params**\
    None
  * **Success Response**
    * Code: 200
      Content: `OK`
  * **Error Response**
    * Username does not exist
      * Code: 404
        Content: `NOT FOUND`
  * **Sample Call**
    `DELETE http://mtg.justingajitos.com/api/users/chosenone HTTP/1.1`

**/api/login**
* **POST**
  * Log in with proper credentials and returns a json web token
  * **URL Params**\
    None
  * **Data Params**\
    * Required
      ```
      {
        "user": {
          "username": "chosenone",
          "password": "ginnyweasley"
        }
      }
      ```
  * **Success Response**
    * Code: 200
      Content:
      ```
      {
        "message": "Auth successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhamkiLCJ1c2VySWQiOiI1ZGZlNmRiMTIxOGI4MjRmMWZkODg3ZjYiLCJpYXQiOjE1ODkxNDE0NjksImV4cCI6MTU4OTE0NTA2OX0.-z9wDCHJOx57dcW8tUj1x9ZLipHuZTdc6b9kqCV8F_I"
      }
      ```
  * **Error Response**
    * Username does not exist
      * Code: 401
        Content:
        ```
        {
          "message": "Auth failed"
        }
        ```
    * Incorrect password
      * Code: 401
        Content:
        ```
        {
          "message": "Auth failed"
        }
        ```
  * **Sample Call**
    ```
    ```
  * **Notes**