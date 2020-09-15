# Magic the Gathering Companion App
[top]: #magic-the-gathering-companion-app

---

* [TODOS](#todos)
* [Information](#information)
  * [Summary](#summary)
  * [Purpose](#purpose)
  * [General Idea](#general-idea)
  * [Features](#features)
  * [Target Audience](#target-audience)
    * [Personas](#personas)
    * [User Stories](#user-stories)
  * [Technology Requirements](#technology-requirements)
* [Timeline](#timeline)
* [Screens](#screens)
* [Data Models](#data-models)
* [Endpoints & Pages](#endpoints--pages)
  * [Endpoints](#endpoints)
  * [Pages](#pages)
* [Testing](#testing)

---

## TODOS

1. Requirements
   1. 1 sentence summary
   2. Purpose (if client) or personal goal (if personal project)
   3. What does the client want (general idea)
   4. What does the client want the app to do (functionality)
   5. Objective & scope
   6. Features
   7. Target audience
      1. Context/situation in which the target audience might use the app
         1. Personas
         2. User stories
   8. Technology requirement / API (optional)
   9. Budget (optional)
   10. Deployment (optional)
2. Timeline
3. Screens
   1. Sitemap planning
   2. Wireframe/mockups
      1. Layout page/s
      2. Markup/label elements in layout
      3. Arrows for navigation from one page to another (i.e. arrow from homepage navbar to about page)
   3. Behavior
   4. User flow
   5. Diagram out which pages people actually see when using the app. Map out your pages to see how your app will actually work.
4. Data models
5. Endpoints & Pages
   1. Code structure
   2. Components
   3. Design (CSS)
6. Testing
   1. What do I need to test and what can go wrong
7. User testing
   1. Reassess feature backlog and compare it to features people are asking for

## Information

### Summary

A Magic the Gathering companion app that lets players track their counters and sync their devices with other players they are in a match with.

### Purpose

To allow players to keep monitor not only their own match data, but also all the match data with players they are in a match with to make sure no one's cheating!

### General Idea

The app will let players join up with other players in an in-app room where they would be able to monitor each others' life points, counters, dice rolls, and other MTG essentials. The players would be able to join rooms using their own accounts on their own devices thus eliminating the need for players to share and pass around a single device to keep track of their match data. Having the ability monitor all the match data on separate devices also allows player to be able to play with each other remotely, even if they are using real cards and not playing on MTG Arena!

### Features

* MVP
  * Life counter
* Phase 2
  * Dice Rolls
* Phase 3
  * User login
    * Password reset
  * Admin panel
* Phase 4
  * Theme Changer
* Phase 5
  * Rooms
    * Real time update using websockets?
    * Copy join link to clipboard, share via chat/social media
    * Timestamp of last edit and edit history
* Phase 6
  * Card lookup
  * Rule lookup
* Good to have
  * Room chat
  * Option to save cards to user in match in order to save and continue the game for next time
  * Photo upload in room to save and continue game for next time

* API Versioning

### Target Audience

Players who want a more convenient way of keeping track of their life counter and other essentials without having to rely on dice, pen and paper, and other traditional methods of keeping track.

Players who don't want to use a shared phone/device with other players and want to be able to use their own separate devices but still be in sync with other players in the match.

Players who want to be able to play remotely with their friends but don't want to move to an platform like MTG Arena. Players who want to play remotely but using their real-life cards and want a way to be able to keep track of not only their own, but the data of all the players in the remote match they're on.

#### Personas



#### User Stories

Mike is a casual player, he's tried using dice but it's always been a hassle for him to find the right number thus making keeping track using dice a less than enjoyable part of the game. He wants to track his life counter using an app that would be as simple as possible because keeping track of it shouldn't take up a lot of his time and attention when playing.

Norman is a busy person, he hasn't played MTG in a few years. He wants to be able to play with his brother who lives a long way away from him but he can't really use MTG Arena because of his computer can't handle it. They decided to play using their real cards on a video call, but he wants to have a way to keep track of not only his life counter, but also his brother's. To keep track of it, he either has to keep asking his brother every turn, or keep track of it himself using his own methods which is a huge bother for their game.

Alan lives with his roommate. They regularly play together after school. They used to use an app that keeps track of their life counter, but it runs on one device and they share it among themselves. Because of the pandemic, they have become more wary and their usual physical closeness has had more of a buffer. They now want to use an app on their own devices to stop the need of using a shared device. They want to be able to use an app that keeps both their counters on each of their screens, not just their - similar to what they were used to when using a shared device.

### Technology Requirements

* Node
* MongoDB

* Front-End
  * React (create-react-app)
  * Redux
  * React-Redux
  * redux-thunk

* Back-End
  * Express
  * bcryptjs
  * *colors
  * *cors
  * dotenv
  * jsonwebtoken
  * Mongoose
  * Morgan
  * Dev Dependencies
    * concurrently
    * nodemon

* API
  * MTG API - for card lookup functionality

## Timeline

## Screens

## Data Models

```json
Users: {
  User: {
    username: {
      type: String,
      required: 'Username is required',
      minlength: 4,
      maxlength: 20,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: 'Password is required',
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    firstName: {
      type: String,
      required: 'First name is required',
      minlength: 1,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: 'Last name is required',
      minlength: 1,
      maxlength: 20,
    },
    dateRegistered: {
      type: Date,
      default: Date.now
    },
    counter: {
      life: {
        type: Number,
        default: 20
      },
      poison: {
        type: Number,
        default: 0
      },
      land: {
        plains: {
          type: Number,
          default: 0
        },
        island: {
          type: Number,
          default: 0
        },
        swamp: {
          type: Number,
          default: 0
        },
        mountain: {
          type: Number,
          default: 0
        },
        forest: {
          type: Number,
          default: 0
        },
      }
    },
    theme: {
      type: String,
      default: 'plains'
    },
    userRooms: [
      {
        roomId: Number
      }
    ]
  },
},
Rooms: [
  room: {
    roomId: Number,
    roomOwner: String,
    messages: [
      {
        username: String,
        content: {
          type: String,
          required: 'Message cannot be empty'
          minlength: 1,
          maxlength: 140
        },
        date: Date
      }
    ],
    users: [
      {
        userId: String,
        counter: {
          life: {
            type: Number,
            default: 20
          },
          poison: {
            type: Number,
            default: 0
          },
          land: {
            plains: {
              type: Number,
              default: 0
            },
            island: {
              type: Number,
              default: 0
            },
            swamp: {
              type: Number,
              default: 0
            },
            mountain: {
              type: Number,
              default: 0
            },
            forest: {
              type: Number,
              default: 0
            },
          },
          dateEdited: {
            type: Date,
            default: Date.now
          }
        },
      }
    ],
  }
]
```

## Endpoints & Pages

### Endpoints

* {Endpoint}
  * Method: {GET/POST/PUT/PATCH/DELETE}
    * Description:
    * Access: {Public/Private}
    * URL Params: {none/optional/required}
    * Data Params: {none/optional/required}
      ```json
      {
        "user": {
          "username": String, Required,
          "firstName": String, Required,
          "lastName": String, Required,
          "password": String, Minimum Length = 8, Required
        }
      }
      ```
    * Success Response:
      ```json
      Status: 201 Created
      Body:
      {
        "success": true,
        "status": 201,
        "data": {}
      }
      ```
    * Error Response:
      * Error: Incomplete data submitted
        ```json
        Status: 400 Bad Request
        Body:
        {
          "success": false,
          "status": 400,
          "error": "Bad Request"
        }
        ```
    * Sample Call:
      ```json
      POST mtg.justingajitos.com/api/users
      Content-Type: application/json

      Body:
      {
        "user": {
          "username": "chosenone",
          "firstName": "Harry",
          "lastName": "Potter",
          "password": "ginnyweasley"
        }
      }
      ```
    * Notes:

* /api/v1/users
  * Method: GET
    * Description: Get list of all users
    * Access: Public
    * URL Params: none
    * Data Params: none
    * Success Response:
      ```json
      Status: 200 OK
      Body:
      {
        "success": true,
        "status": 200,
        "count" : 2,
        "data": [
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
    * Error Response:
      ```json
      Status: 500 Server Error
      Body:
      {
        "success": false,
        "status": 500,
        "error": "Server Error"
      }
      ```
    * Sample Call: `GET http://mtg.justingajitos.com/api/v1/users HTTP/1.1`
    * Notes: none
  * Method: POST
    * Description: Create a new user
    * Access: Public
    * URL Params: none
    * Data Params: required
      ```json
      Body:
      {
        "user": {
          "username": String, Required,
          "firstName": String, Required,
          "lastName": String, Required,
          "password": String, Minimum Length = 8, Required
        }
      }
    * Success Response:
      ```json
      Status: 201 Created
      Body:
      {
        "success": true,
        "status": 201,
        "data": {}
      ```
    * Error Response:
      * Error: A required field is missing or data type is incorrect, username is already taken, password length too short
      ```json
      Status: 400 Bad Request
      Body:
      {
        "success": false,
        "status": 400,
        "error": "Bad Request"
      }
      ```
    * Sample Call
      ```json
      POST mtg.justingajitos.com/api/v1/users
      Content-Type: application/json

      Body:
      {
        "user": {
          "username": "chosenone",
          "firstName": "Harry",
          "lastName": "Potter",
          "password": "ginnyweasley"
        }
      }
      ```
    * Notes: none

* /api/v1/users/:userId
  * Method: GET
    * Description: Get details of a single user
    * Access: Public
    * URL Params: required `userId=[String]`
    * Data Params: none
    * Success Response:
      ```json
      Status: 200 OK
      Body:
      {
        "success": true,
        "status": 200,
        "data": {
          "user": {
            "username": "chosenone",
            "firstName": "Harry",
            "lastName": "Potter"
          }
        }
      }
      ```
    * Error Response:
      * Error: User does not exist
        ```json
        Status: 404 Not Found
        Body:
        {
          "success": false,
          "status": 404,
          "error": "Not Found"
        }
        ```
    * Sample Call: `GET http://mtg.justingajitos.com/api/v1/users/1234kjhasdf`
    * Notes: none
  * Method: PUT
    * Description: Update user information
    * Access: Private
    * URL Params: required `userId=[String]`
    * Data Params: required
      ```json
      x-auth-token: JWT token

      Body:
      {
        "user": {
          "username": "chosenone", (optional)
          "firstName": "Harry", (optional)
          "lastName": "Potter", (optional)
          "password": "ginnyweasley" (optional)
        }
      }
      ```
    * Success Response:
      ```json
      Status: 200 OK
      Body:
      {
        "success": true,
        "status": 200,
        "data": {}
      }
      ```
    * Error Response:
      * Error: Any required payload is missing, username is already taken
        ```json
        Status: 400 Bad Request
        Body:
        {
          "success": false,
          "status": 400,
          "error": "Bad Request"
        }
        ```
      * Error: User does not exist
        ```json
        Status: 404 Not Found
        Body:
        {
          "success": false,
          "status": 404,
          "error": "Not Found"
        }
        ```
      * Error: No token sent
        ```json
        Status: 401 Not Authorized
        Body:
        {
          "success": false,
          "status": 401,
          "error": "Not Authorized"
        }
        ```
    * Sample Call:
      ```json
      PUT mtg.justingajitos.com/api/v1/users/1234kjhasdf
      Content-Type: application/json
      x-auth-token: token

      Body:
      {
        "user": {
          "username": "chosenone",
          "firstName": "Harry",
          "lastName": "Potter",
          "password": "ginnyweasley"
        }
      }
      ```
    * Notes:
  * Method: DELETE
    * Description: Delete a user
    * Access: Private
    * URL Params: required `userId=[String]`
    * Data Params: required `x-auth-token: token`
    * Success Response:
      ```json
      Status: 200 OK
      Body:
      {
        "success": true,
        "status": 200,
        "data": {}
      }
      ```
    * Error Response:
      * Error: User does not exist
        ```json
        Status: 404 Not Found
        Body:
        {
          "success": false,
          "status": 404,
          "error": "Not Found"
        }
        ```
      * Error: No token sent
        ```json
        Status: 401 Not Authorized
        Body:
        {
          "success": false,
          "status": 401,
          "error": "Not Authorized"
        }
        ```
    * Sample Call:
      ```
      DELETE mtg.justingajitos.com/api/v1/users/1234kjhasdf
      x-auth-token: token
      ```
    * Notes:

* /api/v1/auth
  * Method: POST
    * Description: Authenticate/login user and returns JWT token
    * Access: Public
    * URL Params: none
    * Data Params: required
      ```json
      {
        "user": {
          "username": String, Required,
          "password": String, Minimum Length = 8, Required
        }
      }
      ```
    * Success Response:
      ```json
      Status: 200 OK
      Body:
      {
        "success": true,
        "status": 200,
        "token": token,
        "data": {
          "user": {
            "username": "chosenone",
            "firstName": "Harry",
            "lastName": "Potter"
          }
        }
      }
      ```
    * Error Response:
      * Error: Incomplete data submitted, invalid credentials, user does not exist
        ```json
        Status: 400 Bad Request
        Body:
        {
          "success": false,
          "status": 400,
          "error": "Bad Request"
        }
        ```
    * Sample Call:
      ```json
      POST mtg.justingajitos.com/api/v1/auth
      Content-Type: application/json

      Body:
      {
        "user": {
          "username": "chosenone",
          "password": "ginnyweasley"
        }
      }
      ```
    * Notes:

* /api/v1/auth/user
  * Method: GET
    * Description: Get all user data except for password
    * Access: Private
    * URL Params: none
    * Data Params: required `x-auth-token: token`
    * Success Response:
      ```json
      Status: 200 OK
      Body:
      {
        "success": true,
        "status": 200,
        "data": {
          "User": {
            "username": "chosenone",
            "isAdmin": false,
            "firstName": "Harry",
            "lastName": "Potter",
            "dateRegistered": "2020-04-07T04:16:58.713Z",
            "counter": {
              "life": 20,
              "poison": 0,
              "land": {
                "plains": 0,
                "island": 0,
                "swamp": 0,
                "mountain": 0,
                "forest": 0
              }
            },
            "theme": "plains",
            "userRooms": []
          },
        }
      }
      ```
    * Error Response:
      * Error: No token sent
        ```json
        Status: 401 Not Authorized
        Body:
        {
          "success": false,
          "status": 401,
          "error": "Not Authorized"
        }
        ```
      * Error: Token not valid
        ```json
        Status: 400 Bad Request
        Body:
        {
          "success": false,
          "status": 400,
          "error": "Bad Request"
        }
        ```
    * Sample Call:
      ```
      GET mtg.justingajitos.com/api/v1/auth/user
      x-auth-token: token
      ```
    * Notes:

### Pages

* / - Homepage
* Login modal
* Register modal
* /users/:userId - user profile
* /users/:userId/edit - edit user profiles
* /rooms/:roomId - room
* /admin - admin panel

### Code structure

root
-client/
--public/
--src/
---actions/
---components/
----auth/
-----LoginModal.js
-----Logout.js
-----RegisterModal.js
---reducers/
---utils/

-config/
--db.js
-controllers/
-models/
--User.js
-routes/
--routes/api/v1/
---api.js

## Testing
