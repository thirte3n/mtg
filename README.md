# Magic: The Gathering Companion App

A Magic: The Gathering companion app that lets players track their counters and sync their devices with other players they are in a match with.

---

## Table of Contents

* [Description](#description)
  * [Demo](#demo)
  * [Status](#status)
* [Features](#features)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Deployment](#deployment)
* [Technologies](#technologies)
* [Author](#author)
* [Acknowledgement](#acknowledgement)
* [License](#license)

---

## Description

This web app will let players join up with other players in an in-app room where they would be able to monitor each other's life points, counters, dice rolls, and other MTG essentials. The players would be able to join rooms using their own accounts on their own devices thus eliminating the need for players to share and pass around a single device to keep track of their match data. Having the ability monitor all the match data on separate devices also allows player to be able to play with each other remotely, even if they are using real cards and not playing on MTG Arena or some other online platform.

Portrait view                                                                               | Landscape view
--------------------------------------------------------------------------------------------|---------------
![](images/readme/capture-portrait.gif)                                                     | ![](images/readme/capture-landscape.gif)
<!-- **Life/poison counter** ![](images/readme/screenshot-single-counter-portrait.png)           | **Life/poison counter** ![](images/readme/screenshot-single-counter-landscape.png) -->
<!-- **Land counter** ![](images/readme/screenshot-land-counter-portrait.png)                    | **Land counter** ![](images/readme/screenshot-land-counter-landscape.png) -->
<!-- **Dice roller** ![](images/readme/screenshot-dice-portrait.png)                             | **Dice roller** ![](images/readme/screenshot-dice-landscape.png) -->
<!-- **Dice roller - custom number modal** ![](images/readme/screenshot-dice-modal-portrait.png) | **Dice roller - custom number modal** ![](images/readme/screenshot-dice-modal-landscape.png) -->

### Demo

Check out the demo [here](http://mtg.justingajitos.com)!

### Status

The project is still in early development.

## Features

* Life counter
* Poison counter
* Mana counter
* Dice roller

**To Do:**

* Log in system
  * Admin panel
  * Password reset
* Theme changer
* Room system where up to eight players can join to share each others counters that updates real time.
  * Implementations for different formats
    * Two-Headed Giant
    * Free-For-All
    * Assassin
    * Emperor
  * Join link sharing functionality
  * Timestamp and edit history
* Card lookup
* Rule lookup

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and [testing](#testing) purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and [git](https://git-scm.com/downloads) installed on your local machine.

### Installation

In your terminal:

```shell
# Clone the repo
$ git clone https://github.com/thirte3n/mtg.git

# Go inside the project directory
$ cd mtg

# Install dependencies (server and client)
$ npm install
$ cd client
$ npm install
$ cd ..

# Create a .env file in the root project directory then add the environment variables written in the Env Variables section
$ touch .env

# Run the React build script
$ cd client
$ npm i
$ cd ..

# Run the app
$ npm start

# OR

# Run the app in development (client on PORT 3000, server on PORT 5000)
$ npm run dev

# OR

# Run just the client in development (on PORT 3000)
$ npm run client

# OR

# Run just the server in development using nodemon (on PORT 5000)
$ npm run server
```

<!--
### Env Variables

Create a .env file in the root project directory and add the following:

```
TODO:
NODE_ENV=
PORT=
MONGO_URI=
JWT_SECRET=
```
-->

<!--
### Testing

To run the tests, open the root project directory in your terminal. Run `npm install` to install all necessary dependencies then run `npm test` to run automated tests.

There are currently no tests written for the client.

TODO:
-->

### Deployment

Before deploying to a server or host of your choice, run the build script for the client.

```shell
# Go inside client directory
$ cd client

# Run the React build script
$ npm run build
```

## Technologies

This project is built with:

* Node
* MongoDB

* Client
  * React (create-react-app)
  * Redux
  * React-Redux
  <!-- * redux-thunk -->
  <!-- * socket.io-client -->
  <!-- * Web Share API -->

* Server
  * Express
  <!-- * bcryptjs -->
  <!-- * *colors -->
  <!-- * *cors -->
  * dotenv
  <!-- * jsonwebtoken -->
  <!-- * Mongoose -->
  <!-- * Morgan -->
  <!-- * socket.io -->
  * Dev Dependencies
    * concurrently
    * nodemon

<!-- * External API
  * [Magic: The Gathering SDK](https://github.com/MagicTheGathering/mtg-sdk-javascript) -->

## Author

- **[Justin Gajitos](https://www.justingajitos.com)** ([thirte3n](https://github.com/thirte3n))

## Acknowledgement

This app was inspired by [MTG Familiar](https://github.com/AEFeinstein/mtg-familiar). This app's dice roll component's general design was based on their dice feature.

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE Version 3 - see the [LICENSE](LICENSE) file for details

<!--
## Contributing

TODO:
-->

<!--
## Database Properties

TODO:
-->

<!--
## API Routes

TODO:
-->
