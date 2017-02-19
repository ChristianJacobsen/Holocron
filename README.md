# Holocron

An Angular 2 material design sockets.io chat application

## Features

* Unique nicknames
* Rooms with instant messaging
    * Can view the entire chat history of the room
* Create and join rooms
* Op, deop, kick and ban users in your room
* Private messages
    * Private message history with everyone you've messaged to
* Toast notifications
* Beautiful UI

## Getting Started

In order to run Holocron on your own machine, you will need [node.js](https://nodejs.org/en/download/) in order to use npm to install the dependencies and run the server.

### Prerequisites

#### Angular-CLI

Run the following command in order to start up the client.

```
$ sudo npm install -g angular-cli
```

#### Dependencies

Run the following command in the Holocron/src/client/ and Holocron/src/server/ folders.

```
$ npm install
```

### Running the server

You start up the server by running chatserver.js, located in the Holocron/src/server/ directory, with node.
From the root directory of the project run the following command in your CLI.

```
$ node src/server/chatserver.js
```

Now the server is up and running on port 8080 by default.

### Starting up the client

You start up the client by using angular-cli
From the client folder of the project (Holocron/src/client/) run the following command in your CLI.

```
$ ng serve
```

Wait a bit while it starts up and afterwards the client is accessible via localhost:4200

### Development

We use the Angular-CLI as our build system which has webpack at it's core.

We also use Gulp to enforce our TypeScript coding rules.

## Built With
* [Angular 2](https://angular.io/) - Framework
* [Angular 2 Material](https://material.angular.io/) - Styling
* [Angular 2 Flex-Layout](https://github.com/angular/flex-layout) - Layout
* [ExpressJS](http://expressjs.com/) - Server
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Gulp](http://gulpjs.com/) - Enforce coding rules

## Authors

* [Christian A. Jacobsen](https://github.com/ChristianJacobsen/)
* [Hilmar Tryggvason](https://github.com/Indexu/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details