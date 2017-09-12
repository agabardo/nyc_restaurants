# NYC RESTAURANTS
## Although this project is 'compiling' and working, it contains conceptual errors. I will rebuild soon.
## Please note. This project is permanently under construction, partially working, some functions need to be finished.
<p align="center">
  <img src="https://raw.githubusercontent.com/agabardo/nyc_restaurants/master/front-end/public/images/logo.png" alt=""/>
</p>

> Spare time project using MongoDB, Express, Angular and Node.JS.
Please, bear in mind that several JavaScript functions can be better written and several pieces of code are used for test only. This is a project for learning purposes and not a commercial project.<br/>
Please bear in mind that many Javascript functions have partially commented code that can be used for future reference. The project is messy at this point and a sanitization of unused functions and files is mandatory.<br/>
Download at your own risk.<br/>
This project includes.<br/>
<ul>
  <li>Front end
    <ol>
      <li>Angular JS framework - v1.4.5</li>
      <li>Bootstrap - v3.3.6</li>
      <li>JQuery - v2.2.2</li>
    </ol></li>
  <li>RESTful API
    <ol>
      <li>MongoDB - MongoDB shell - v3.2.1</li>
      <li>Express JS framework - v4.13.1</li>
      <li>Node.js - v5.5.0</li>
    </ol></li>
  <li><a href='https://github.com/michaelbromley/ng2-pagination'>NG2-pagination</a></li>
</ul>

# THE MEAN STACK
The project from this branch and beyond has the following organisation. The software used are the MEAN stack (Mongo DB, Express, Angular and Node.JS) including the Twitter Bootstrap for the front-end. The front-end consumes data from Node.JS using a RESTful API. See the image below for more info.
<br/>
<br/>
<p align="center">
<img width="100%" align="center" src="https://raw.githubusercontent.com/agabardo/nyc_restaurants/master/images-readme-md/nyc-mean-js.png" alt="NYC Mean"/>
</p>
<br/><br/>
The data-flow with REST follows the requests and returns as the image below.
<br/>
<p align="center">
<img width="60%" align="center" src="https://raw.githubusercontent.com/agabardo/nyc_restaurants/master/images-readme-md/meanjs-1024x492.png" alt="Mean data-flow"/>
</p>

# HOW TO INSTALL
> This section details how to install this project in a local machine in order
to test it. Please note that this app was only tested on Mac OSX.
<ol>
<li><a href='https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json'>Download</a> and <a href='https://docs.mongodb.com/getting-started/shell/import-data/'>install</a> the MongoDB database file.</li>
<li>Clone the repository: $git clone https://github.com/agabardo/nyc_restaurants.git</li>
</ol>

#HOW TO RUN
##Starting your Node.JS local server
> Simply navigate to the project folder and use the command 'start' with Node Package Manager: <i>$ npm start</i><br/>
Tip: Be sure your MongoDB is up and running.<br/><br/>
To access your project use the address: http://localhost:3000/

<br/>
##Next milestones
<ul>
<li>Make an easy option for Clearing the search.</li>
<li>Making the submission of the filters automatic.</li>
<li>Create an UIX friendly menu for the 'Cuisine' drop down (too many items).</li>
<li>Change the favorites from sessios to SQLite or other database.</li>
<li>Add the Geolocation as the suggested Lat,Long for a new restaurant.</li>
<li>Add an integration with oAuth for login.</li>
<li>OK. <del>Add a tree structure to explain the folders in the project.</del></li>
<li>OK. <del>Build a simple data-flow graph with the flow of the app.</del></li>
<li>OK. <del>Sanitization of unused javascript functions.</del></li>
<li>OK. <del>Sanitization of unused packages.</del></li>
<li>OK. <del>Add the missing endpoints for the API.</del></li>
</ul>
<br/>

#CURRENT SCREENSHOTS
<img width="100%" src="https://raw.githubusercontent.com/agabardo/nyc_restaurants/master/images-readme-md/screencapture-localhost-3000-1470562410908.png">
<img width="100%" src="https://raw.githubusercontent.com/agabardo/nyc_restaurants/master/images-readme-md/screencapture-localhost-3000-1470562410908C.png">
