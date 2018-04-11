# app-idea-tweets V1.0.01

## Description

This project allows you to get Twitter updates which could give you ideas for a new app or startup with only 70 lines of Javascript, and an HTML file to display the tweets from the Twitter stream. 

Since we're retrieving data from a stream, we may be storing information for multiple tweets at a time so we'll be using MongoDB. 

While it's not meant for production, this would be a good base to expand further to work on apps which involve analyzing data from Tweets. It will also be a good intro for those interested to learn about Twit and Socket.io.  

## Key Node Packages

1. Express
2. MongoDB
3. Twit 
4. Socket.io

## Notices 
1. This project is not recommended to be in production

2. Prerequsites for this project:
   a. NodeJS 
   b. MongoDB
   c. Twitter Developer API keys - Get your Twitter API credentials at <a href="https://developer.twitter.com/" target="_blank">here</a> 

3. Before running the app: 
   - Run <b>npm update</b> to get the packages from the package.json file. 
   - Ensure that you run the command <b>mongod</b> in your terminal and <b>mongo</b> in another to turn on MongoDB on your system.
   - Build the database "twitterfeed" and the collection named "tweets" with the db.js file with the command <b>node db.js</b>. 