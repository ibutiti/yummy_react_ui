# Yummy Recipes

[![Coverage Status](https://coveralls.io/repos/github/ibutiti/yummy_react_ui/badge.svg?branch=master)](https://coveralls.io/github/ibutiti/yummy_react_ui?branch=master) [![Build Status](https://travis-ci.org/ibutiti/yummy_react_ui.svg?branch=master)](https://travis-ci.org/ibutiti/yummy_react_ui)

This is a React application that provides a platform for users to keep track of their recipes and share them with others if they so wish.

A working version of the app is hosted on heroku. Click [here](https://yummy-react-ui.herokuapp.com/) to see the app in action.

Specifically, the application allows users to:

1.  Create a user account
2.  Login
3.  Create, view, update and delete recipe categories
4.  Create, view, update and delete recipes in existing categories

The project is still in development. Development will follow the following path:

1.  ~~Create the app user interface templates~~
2.  ~~Implement the app features using a Flask app & integrate them with the UI templates~~
3.  ~~Create a Flask API~~
4.  ~~Consume the Flask API using a React frontend~~

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To get the Yummy Recipes React application up and running on your local machine, you will need:

```
A modern web browser, preferrably Google Chrome or Firefox
Nodejs
```

### Installing

Create a directory on your local drive and clone this repository to it. If you have git installed on your machine, [installers and instructions here](https://git-scm.com/), you could run the following commands:

```
mkdir Yummy-Recipes
cd Yummy-Recipes
git clone https://github.com/ibutiti/yummy_react_ui.git
```

First install yarn by running:

```
npm install --save yarn
```

Use yarn to install the dependencies by running the following command:

```
yarn
```

Navigate to the 'yummy_react_ui' folder cloned to your local machine.

Start the application development server by running the following command:

```
yarn start
```

If all is well, you can then run the app by navigating your browser to the below address:

```
http://localhost:3000
```

### Other Scripts

#### Production Builds

You could eject the project (prepare it for production deployment) by running:

```
yarn build
```

#### Running Tests

You could run tests by executing the below command:

```
yarn test
```

## Authors

* **Allan Ibutiti** - _Initial work_ - [Ibutiti](https://github.com/ibutiti)

## Acknowledgments

* [Andela](https://www.andela.com) for facilitating my learning & resolving my blockers
