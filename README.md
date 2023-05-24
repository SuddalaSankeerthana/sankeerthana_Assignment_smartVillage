# ProjectAqua
## Table of Content
- Description
- Installation
- Usage
## Description
Rangasthalam is the smart village contains 3 members of water user.The entire village water is supplied by three major vendors: Lotus Water, Lucky Water and Water Lilies.Each house in the village has a pipe connection for water along with a smart meter attached to it and at a time they have subscribed to only one of the vendors for water supply( they can change only once a month at the start).Smart meters record how many gallons of water has been used throughout the day ( they record hourly basis and push data to the server).
This application provides monitering and controlling capabilities to the water usage for the villagers.
- This project contains recorded data from the starting of this year for 3 villager.
## Installation
For running the application the requirements are:
- Text Editor or IDE
- Download and install the NodeJS framework onto your computer system.To install go through [https://nodejs.org/en/download/package-manager](url)
```
npm install
```
- Install TypeScript compiler.

[https://www.typescriptlang.org/download](url)

- You need to install prompt-sync for running this application.
```
npm install sync-promp
```
## Usage
To use follow the below steps:
- Run the smartVillageAqua.ts
```
tsc smartVillageAqua.ts
```
- Run the smartVillageAqua.js
```
node smartVillageAqua.js
```
- Enter MeterId: <meterId>
- Choose the option based on the features
## Features
  
0 : Exit 
  
1 : Show total usage of water in the past month
  
2 : Show total cost for usage in the past month
  
3 : Show total cost for usage in the past 1 week
  
4 : Show daily water usage and cost for a given date range
  
5 : Compare prices of all vendors for a specific water usage amount.

