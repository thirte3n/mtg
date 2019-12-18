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
  - username - String, required, minlength: 4, maxlength: 20, trim, lowercase
  - firstName - String, required, minlength: 1, maxlength: 20
  - lastName - String, required, minlength: 1, maxlength: 20
  - password - String, required, minlength: 8, maxlength: 20
  - dateRegistered - Date, default: Date.now

## API Routes

**/api/users**
- GET
  - Returns a 200 response containing all username and id on the `users` property of the response body
- POST
  - Creates a new user with the information from the `user` property of the request body and saves it to the database. Returns a 201 response with the newly-created user on the `user` property of the response body
  - If any required fields are missing, returns a 400 response

**/api/users/:userId**
- GET
  - Returns a 200 response containing the user with the supplied username on the `user` property of the response body
  - If an user with the supplied username doesn't exist, returns a 404 response
- PUT
  - Updates the user with the specified username using the information from the `user` property of the request body and saves it to the database. Returns a 200 response with the updated user on the `user` property of the response body
  - If any required fields are missing, returns a 400 response
  - If an user with the supplied username doesn't exist, returns a 404 response
- DELETE
  - Deletes the user with the specified username from the database. Returns a 200 response.
  - If an username with the supplied username doesn't exist, returns a 404 response
