## 4.1 Plan Introduction
  This Software DevelopmentPlan provides the deatails of the planned development for the Pitkin Encrypted Journalism WebApp, aka "Pitkin". Pitkin will allow endusers to research, write, publish, and read articles anonymously as a Tor service, so opinions and insight can be shared without fear of retribution.  Pitkin's development will be completed once an RESTful API service is exposed, once users can send text through chatrooms, pull down Instant Answers from DuckDuckGo, save raw text to Pitkin, and publish that raw text to an anonymous blogroll.     
  The subtasks for Pitkin's completion are as follows:
    * Jan 21 -- Project Proposal Document
    * Feb 11 -- Initial Requirements Specification Document
    * Mar 4 -- Initial Software Development Plan Document
    * Mar 11 --  Project Design Review Presentation
    * Mar 18 -- Completed Software Development Plan Document
    * Apr 1 -- Completed Requirements Specification Document
    * Apr 15 -- Preliminary Demonstration Presentation
    * May 6 -- Final Presentation

### 4.1.1 Project Deliverables
    * Jan 21 -- [Project Proposal Document](https://docs.google.com/presentation/d/1zv4tMT1xM6mJqjh8OxhfpYz_5tK8m1y3uY0_OpYZQi4/pub?start=false&loop=true&delayms=3000)
      * A descriptive presentation on the idea of Pitkin.  This included a description of the project and the justification behind it. 
    * Feb 11 -- [Initial Requirements Specification Document](https://github.com/dannyjgibson/pitkin/blob/master/sdf/5.0/software-requirements-specification.md)
      * This document is sort of contract between future end users of Pitkin and myself. 
      * The functionaility that shall and will be provided by the app are outlined here.
      * This document also specifies the requirements for the client -- what specs their machine must have to use the app.
    * Mar 4 -- Initial Software Development Plan Document
      * The document you are currently reading
      * Outliens the steps to complete Pitkin. 
    * Mar 11 --  Project Design Review 
      *  A peer review time to analyze the design of Pitkin and other apps.
    * Mar 18 -- Completed Software Development Plan Document
      * Completed form of the deliverable due on Mar 4.
    * Apr 1 -- Completed Requirements Specification Document
      * Completed form of the [deliverable](https://github.com/dannyjgibson/pitkin/blob/master/sdf/5.0/software-requirements-specification.md) due on Feb 11.
    * Apr 15 -- Preliminary Demonstration Presentation
      * A time to demonstrate Pitkin's functionality to peers.
      * A time to refine the presentation for the final day of the semester. 
    * May 6 -- Final Presentation
      * The final day of the senior project. 
      * Demonstrate the complet functionality of the Pitkin App
      * Demonstrate my full understanding of the process of Software Development.
## 4.2 Project Resources
  * ["Mean Machine"](https://leanpub.com/mean-machine) by Chris Sevillaja and Holly Lloyd
  * ["Write Modern Web Apps with the MEAN Stack"](http://www.amazon.com/Write-Modern-Apps-MEAN-Stack/dp/0133930157) by Jeff Dickey 
  * ["Software Engineering, The Current Practice"](http://www.amazon.com/Software-Engineering-Practice-Innovations-Development/dp/1439841225/ref=sr_1_1?s=books&ie=UTF8&qid=1425280803&sr=1-1&keywords=software+engineering+the+current+practice) by Vaclav Rajlich
### 4.2.1 Hardware Resources
  * My MacBook Pro
    * Model Name: MacBook Pro
    * Model Identifier: MacBookPro6,2
    * Processor Name: Intel Core i7
    * Processor Speed:  2.66 GHz
    * Number of Processors: 1
    * Total Number of Cores:  2
    * L2 Cache (per Core):  256 KB
    * L3 Cache: 4 MB
    * Memory: 8 GB
    * Processor Interconnect Speed: 4.8 GT/s
    * Boot ROM Version: MBP61.0057.B0F
    * SMC Version (system): 1.58f17
  
### 4.2.2 Software Resources
  * Writing: 
    * Sublime Text 3
    * Vim
  * Dependencies
    * node - 0.10.31
    * npm - 1.4.23
    * jade - 1.9.2 
    * SASS -- 3.4.11
    * MongoDB -- 2.4.6
    * Mongoose -- 3.8.19
    * BCrypt -- 0.8.1
    * CryptoJS -- 3.1.2
    * express -- 4.10.3
    * morgan -- 1.5.0
    * body-parser -- 1.9.3
    * socket-io -- 1.0

## 4.3 Project Organization
  * api/
    * The API will provide CRUD operations on Mongo DB collections for Users and Articles. The other major functions will rely on the api to provide data for their services.
    * Finish this piece of Pitkin with all relevant endpoints and actions by first weekend of March. 
  * chat/
    * The chatroom will allow for users to log into Pitkin and chat with each other in the app. Chatrooms will be created by pitkin and users can invite each other into chatrooms.
    * Finish Pitkin chat functionality by the 8th class time, the second Wednesday in March.
  * search/
    * The search will pull answers from DuckDuckGo's Instant Answers API. Answers will be served in a a single column below the search bar.
    * Since this search functionality will require use of the DuckDuckGo API (and perhaps some others), it might take a bit longer. This should be finished by the 9th class time, in mid-March.
  * write/
    * The write functionality lets end users write, save, and open raw text files to pitkin's database.
    * This is a simple front-end that should be finished by the 10th class time, the second Wednesday in March.
  * blog/
    * Users' published articles can be accessed on the blog. Blog-published articles will be tagged by users.
    * The front-end for this project is pretty straight forward, and can be completed on the same time-line as the write/sub-task in early March. However, the system of filtering blog-posts is more difficult, and this portion of the project should be finished by the first week of April.

## 4.4 Project Schedule
This section provides schedule information for the Pitkin project.

### 4.4.1 GANTT Chart

<div id="timesheet"></div>
<link rel="stylesheet" type="text/css" href="https://raw.githubusercontent.com/sbstjn/timesheet.js/master/dist/timesheet.css">
<script type="text/javascript" src="https://raw.githubusercontent.com/sbstjn/timesheet.js/master/dist/timesheet.js">
  new Timesheet('timesheet', 0, 15, [
    ['0', '8', 'Building the API', 'lorem'],
    ['8','10', 'Front-end for Writing', 'doodle'],
    ['2', '9', 'Building out Chat', 'ipsum'],
    ['8', '9', 'Building out Searc', 'wolfram'],
    ['10', '12', 'Blog front-end', 'bp'],
    ['12', '15', 'Blog filtering', 'lost prosperctor'],
    ['14', '15', 'Prepare presentation', 'duppp']
  ]); 
</script>

### 4.4.2 Task / Resource Table

Task | Resource 
--- | ---
api | node, express, npm, mongodb, mongoose
chat | socket, node, jade, sass, express
search | node, duckduckgo, jade, sass, express
write | node, express, jade, sass
blog | express, jade, sass




