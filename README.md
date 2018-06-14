# Mapout Ingredients

# Project Description
This repo includes all the calls to each of APIs as well as JSON files that our skill we are developing will use. This repo will primarily be used as a testing environment.


# File Descriptions

# axios_way.js 
To install axios go to npm install axios. This is another way for you to be able to call APIs 

# google_API.js 
This uses Google's API specifically the map, as well as a geocode API to be able to determine location. This will be used in our skill to get the start and end locations for the trip which we can them use later on to judge the distance traveled.

# matrix_api.js 
This is the place that the distance and duration of a trip will actually be calculated. Using Google's distance matrix API we are able to figure the distance and the duration of the trip.

# mygasfeed.js 
This uses an API from mygasfeed.com to help determine the price of gas in a certain location given it's latitude and longitude.

# shine_api.js 
This uses several of different APIs from solarialabs.com's shine stats. These APIs include data that can tell you based off of the makes and models of a car if it is among those most commonly stolen in a given area, stats such as the mpg or average annual cost to operate the vehicle and some predictions for information such as how the car may perform in the future.

# To Hide API_KEY

## Install & Require dotenv Module

1. In the Terminal, in the root directory of your Node.js app, install the `dotenv` module.

  ```zsh
    npm install --save dotenv
  ```

2. At the top of your `server.js` file, require and load `dotenv`.

  ```js
  /*
   * server.js
   */

  var express = require('express'),
      app = express(),

      // require other modules
      ...

  // require and load dotenv
  require('dotenv').load();
  ```

## Create .env File

1. In the root directory of your project, create a file called `.env`. This is a hidden file where you'll store API keys and other environment-specific variables.

  ```zsh
    touch .env
  ```

2. **Before you do anything else,** add `.env` to your `.gitignore`! This is what "hides" your API keys and prevents them from being exposed on GitHub.

  ```js
  /*
   * .gitignore
   */

  node_modules
  .env
  ```

3. **After you add `.env` to your `.gitignore`,** add your API keys to `.env`. *Change MY_API_KEY to your variable name and your actual key.*

  ```js
  /*
   * .env
   */

  MY_API_KEY=0932nv8d17vhd72o2e8cfv82csd9n1dcd98
  ```

## Accessing Environment Variables

In `server.js`, or any other back-end JS file (models, etc.), you can access your API keys and other environment-specific variables through `process.env`.

```js
/*
 * server.js (or any other back-end JS file)
 */

// I need to use my API key! How do I access it?
process.env.MY_API_KEY // returns value of MY_API_KEY
```
# Original Source 
https://github.com/justincastilla/hiding-secrets-in-node/blob/master/README.md#create-env-file

