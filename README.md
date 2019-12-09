# mtg

Magic the Gathering App

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Node.js

```
Give examples
```

### Installing

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

Run `$ npm install` to run necessary dependencies then run `$ npm test` to run automated tests.

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Express](http://www.dropwizard.io/1.0.2/docs/) - Web framework
* [Mongoose](#) - MongoDB ORM

* [Nodemon]

* [Mocha]
* [Chai]
* [Supertest]

* [cors] - cors middleware
* [morgan] - Logging middleware

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Justin Gajitos** - *Initial work* - [thirte3n](https://github.com/thirte3n)

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE Version 3 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* [Brad Traversy](https://www.youtube.com/user/TechGuyWeb) - Awesome teacher

## Database Properties

* **users**
  - username - Text, required
  - firstName - Text, required
  - lastName - Integer, required
  - password - Integer, defaults to `1`
  - dateRegistered -

## Routes

**/api/users**
- GET
  - Returns a 200 response containing all saved currently-employed employees (`is_current_employee` is equal to `1`) on the `employees` property of the response body
- POST
  - Creates a new employee with the information from the `employee` property of the request body and saves it to the database. Returns a 201 response with the newly-created employee on the `employee` property of the response body
  - If any required fields are missing, returns a 400 response

**/api/users/:userId**
- GET
  - Returns a 200 response containing the employee with the supplied employee ID on the `employee` property of the response body
  - If an employee with the supplied employee ID doesn't exist, returns a 404 response
- PUT
  - Updates the employee with the specified employee ID using the information from the `employee` property of the request body and saves it to the database. Returns a 200 response with the updated employee on the `employee` property of the response body
  - If any required fields are missing, returns a 400 response
  - If an employee with the supplied employee ID doesn't exist, returns a 404 response
- DELETE
  - Updates the employee with the specified employee ID to be unemployed (`is_current_employee` equal to `0`). Returns a 200 response.
  - If an employee with the supplied employee ID doesn't exist, returns a 404 response