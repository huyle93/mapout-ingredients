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

