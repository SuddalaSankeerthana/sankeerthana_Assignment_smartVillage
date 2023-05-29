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
- Install TypeScript globally by running the following command
```
npm install -g typescript
```

- You need to save prompt-sync dependencie for running this application.
```
npm install --save prompt-sync
```
## Usage
To use follow the below steps:
- clone the repository by running the following command
```
git clone https://github.com/everest-engineering/sankeerthana_Assignment_smartVillage.git
```
- Run the smartVillageAqua.ts
```
tsc smartVillageAqua.ts
```
- Data is generated from starting of this year in villagerdata.json by running hourlyData.ts.
- Import the downloded data by choosing the path
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

