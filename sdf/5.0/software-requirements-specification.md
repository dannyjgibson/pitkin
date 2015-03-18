## 5.1 Introduction
Pitkin is a Journalism web application. An end-user has the ability to research, write, and publish within the Pitkin web application. Each of the described functions is built out as its own small web app, which will pass properties of an Article Object between the apps to get to publication.
![pitkin-overview](http://i.imgur.com/KACGTNn.png)  
The remainder of this document is as follows. Section 5.2 contains Pitkin's functional requirements, with each subsection being a single functional requirement described in detail. Section 5.3 contains Pitkin's performance requirements, with a performance requirement described in detail in each subsection. Section 5.4 contains Pitkin's Environment Requirements, with subsection 5.4.1 describing the Development Environment Requirements and 5.4.2 describing the Execution Environment Requirements.
## 5.2 Functional Requirements
The Functional Requirements of Pitkin describe the basic functionality provided by the four subsystems of the web-app. Without specifying the performance/appearance of the functionality, a user should be able to "check off" the Functional Requirements listed here as they use the app. 
### 5.2.1 Chat
#### 5.2.1.1 
Every chat room shall have a unique generated ID of 16 characters. This ID is be a section of the chatroom's Uniform Resource Locater (URL) path.
##### 5.2.1.1.1
The creator of a chatroom shall be able to share the unique ID of the chatroom to another end-user that wants to join the chatroom. If another user enters the URL of the chatroom, they shall be prompted to join the chat.
#### 5.2.1.2 
Chatroom users shall be able to specify their own username that appears next to the text they enter into a chatroom.
#### 5.2.1.3
User names shall default to a number, derived from order that each user enters the room.
#### 5.2.1.4
Chat conversations shall be archived manually. Users may specify if they'd like to save the raw text locally or on Pitkin's file system.  Archiving will be enabled by a button on control panel modal or by entering the "\archive" command into the chat.  
#### 5.2.1.5 
Requirements 5.2.1.1 - 5.2.1.4 shall have both chat-box shortcuts and a Graphical User Interface (GUI) control modal to change the settings. The control modal shall be appear on a user's first use of a chatroom, and will also be accessible by a button. The chat box shortcuts will include "\archive", "\change-username" and others.
#### 5.2.2 Search
#### 5.2.2.1
The Search functionality shall return answers from DuckDuckGo.
#### 5.2.2.2
The Search GUI shall be a Search bar, submit button, and check boxes for each field that could be returned.
#### 5.2.2.3
Search results shall be returned in a column pattern - one result per row.
##### 5.2.2.3.1
The information returned by a search shall utilize DuckDuckGo's API.
##### 5.2.2.3.2
Returns shall include a dictionary definition, topic summary, and array of associated links of the search parameter.
##### 5.2.2.3.3
Note, that if an Instant Answer is present, Pitkin search shall return DuckDuckGo's Instant Answer on the topic. These are user-defined answers accepted by DuckDuckGo's moderators. 
##### 5.2.2.3.4
Users shall be able to specify if they only want a subset of the potential returned data to be returned. This ability will be provided by checkboxes under the Search Bar. 
##### 5.2.2.3.5
The default for searching is Req. 5.2.2.3.2, and the checkboxes of Req. 5.2.2.3.4 will reflect that. 
##### 5.2.2.3.6
After returning data, a search bar without check boxes will be found at the top of the results page, and the default subset of Req. 5.2.2.3.4 will persist if a search is made from the results page.

### 5.2.3 Draft
#### 5.2.3.1
End users shall be able to save files to a remote file system.
#### 5.2.3.2
End users shall be able to open files saved previously. A text input form element will be presented and populated with the raw text data. 
#### 5.2.3.3
Drafting shall support raw text.
#### 5.2.3.4
Considering Requirement 5.2.3.3, the drafting GUI shall be a single text input and save button.
### 5.2.4 Publication
#### 5.2.4.1 
Writers shall be able to tag articles for relevant subject matter.  Tagging functionality will be made available in a text input element, with a submit button that starts parsing the input text.
##### 5.2.4.1.1
Tags shall be user defined strings, entered into the tag input element.
##### 5.2.4.1.2
Tags shall be delimited by commas.
##### 5.2.4.1.3
Tags shall be single words. That is, anything delimited by spaces will be replaced with dashes.
##### 5.2.3.1.4
The tags that a user inputs shall be shown to the user before he or she saves the article.
##### 5.2.3.1.5 
If a user wants to delete a tag, he or she shall be able to do so.
#### 5.2.4.2
Readers shall be able to filter articles by date and by topic tags.
##### 5.2.4.2.1
Dates shall be filterable by clicking on an arrow in the date column. 
##### 5.2.4.2.2
Tags shall be filterable by a tag-name text input. Any articles with tags matching the filter will be visible on the page.
#### 5.2.4.3
Readers shall be able to flag offensive or repetitive material. Material that is flagged as offensive by ten unique readers will be deleted from the database.

## 5.3 Performance Requirements
The Performance Requirements of Pitkin describe the performance of the Pitkin web app. These are easiest to gather using third party analytics. I plan to use the Google PageSpeed Insight test to provide the best experience I can for the users. So while a user should be able to check that Functional requirements are met, the Performance Requirements cannot be assessed by the human eye. 
### 5.3.1
Google provides a service that hits URL and reports on the speed, structure, and readability of the URL.  I will run this against the public-facing URLs, and follow the suggestions of the tests to speed performance and enhance UX. 
#### 5.3.1.1
The web app with a Desktop shall score 90+/100 on Google's PageSpeed Insights test. 
#### 5.3.1.2
The web app shall be tailorable to incorporate the recommendations obtained from the Google PageSpeed Insights test.
### 5.3.2 - A Note
Note for Requirement 5.3.1, if using app as a Tor Service, the load speed might suffer. Since one goal of the app is to host as a Tor Service, the speed of a site might suffer as it is served through Tor relays.  Since the traffic of the site might be routed through several machines, the app might slow down. It would probably be good form for me to start a Tor relay of my own as "pay-it-forward" for the non-profit. 
### 5.3.3
However, the app shall either be a quick web service (Requirement 5.3.1) or an anonymous service (5.3.2). An anonymous service does not document the IP addresses that make requests of the service. This will be tested with a suite that compares the IP addresses of clients. A quick web service is one that scores above 90 on the Google PageSpeed Insight test. These may be mutually exclusive properties since the speed of the Tor network is relatively out of my control -- short of firing up a bunch of relays.

## 5.4 Environment Requirements
The full functionality of the Pitkin web app requires a modern web browser. The most popular browsers are Google Chrome, Microsoft Internet Explorer, Mozilla Firefox, Apple Safari, and Opera. These will be supported.  
### 5.4.1 Development Environment Requirements
#### 5.4.1.1
The Integrated Development Environment (IDE) shall be Sublime Text and Vim.
#### 5.4.1.2
Hardware for development shall be my MacBook Pro (MBP) running OS 10.10.1 and Acer C7 Chromebook running ChromeOS and Ubuntu
#### 5.4.1.3
The Version Control System (VCS) for the project's source code shall be Git, hosted in a private Github repo.
### 5.4.2 Execution Environment Requirements
##### 5.4.2.1
For anonymous web app usage, an end user shall need TorBrowser, or Tor enabled on their machine.
#### 5.4.2.2
For non-anonymous web app usage, a user shall be able to use a modern web browser, including IE 11 and newer.
