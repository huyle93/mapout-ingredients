## Mapout Ingredients

Project Description
This repo includes all the calls to each of APIs as well as JSON files that our skill we are developing will use. This repo will primarily be used as a testing environment.


## File Descriptions

app.js uses a recommender that will take data from each person and their opinions on a variety of different topics by having them give each one a score. From there the recommender is able to determine what sort of interests best apply to each person.

## xios_way.js

## google_API.js:
uses googles API specifically the map, as well as a geocode API to be able to determine location. This will be used in our skill to get the start and end location for the trip which we can them use later to judge the distance traveled.

## matrix_api.js:
is the spot where the distance and duration will actually be calculated. Using googles distance matrix API we are able to figure the distance and the duration of the trip.

## mygasfeed.js:
uses an API from mygasfeed.com to help determine the price of gas in a certain location given it's latitude and longitude.

package-lock.json

package.json

 ## shine_api.js:
 uses several of different APIs from solarialabs.com's shine stats. These APIs include data that can tell you based off of the makes and models of a car if it is among those most commonly stolen in a given area, stats such as the mpg or average annual cost to operate the vehicle. Finally we can also the Shine API to give us some predictions for information such as how the car may perform in the future.
