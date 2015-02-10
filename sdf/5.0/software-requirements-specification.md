## 5.1 Introduction
Pitkin is a Journalism web application. An end-user has the ability to research, write, and publish within the Pitkin web application. Each of the described functions is built out as its own small web app, which will pass properties of an Article Object between the apps to get to publication.
![pitkin-overview](http://i.imgur.com/KACGTNn.png)  
The remainder of this document is as follows. Section 5.2 contains Pitkin's functional requirements, with each subsection being a single functional requirement described in detail. Section 5.3 contains Pitkin's performance requirements, with a performance requirement described in detail in each subsection. Section 5.4 contains Pitkin's Environment Requirements, with subsextion 5.4.1 describing the Development Environment Requirements and 5.4.2 describing the Execution Environment Requirements.

## 5.2 Functional Requirements
	5.2.1 Chat
		5.2.1.1 Chatrooms shall have unique room IDs that can be shared
		5.2.1.2 Chatroom users shall be able to change their handle.
		5.2.1.3 Handles shall default to a number, derived from time in the room.
		5.2.1.4 Chat conversations shall be archivable.
		5.2.1.5 Requirements 5.2.1.1 - 5.2.1.4 shall have both chat-box shortcuts and a GUI modal settings.
	5.2.2 Search
		5.2.2.1 The Search functionality shall return answers from DuckDuckGo.
		5.2.2.2 The Search GUI shall be a simple as Google's interface - Search bar and submit button.
		5.2.2.3 Search results shall be returned in a column pattern - one result per row.
	5.2.3 Draft
		5.2.3.1 End users shall be able to save files to a remote filesystems.
		5.2.3.2 End users shall be able to open files saved previously.
		5.2.3.3 Drafting shall support raw text.
		5.2.3.4 Considering Requirement 5.2.3.3, the drafting GUI shall be a single text input and save button.
	5.2.4 Publication
		5.2.4.1 Writers shall be able to tag articles for relevant subject matter.
		5.2.4.2 Readers shall be able to filter articles by date and by topic tags.
		5.2.4.3 Readers shall be able to flag offensive or repetitive material.
## 5.3 Performance Requirements
	5.3.1 The web app with a Desktop shall score 90+/100 on Google's PageSpeed Insights test.
			Google provides a service that hits URL and reports on the speed, structure, and readability of the URL.  I will run this against the public-facing URLs, and follow the suggestiosn of the tests to speed performance and enhance UX. 
	5.3.2 Note for Requirement 5.3.1, if using app as a Tor Service, the load speed might suffer.
			Since one goal of the app is to host as a Tor Service, the speed of a site might suffer as it is served through Tor relays.  Since the traffic of the site might be routed through several machines, the app might slow down. It would probably be good form for me to start a Tor relay of my own as "pay-it-forward" for the non-profit. 
	5.3.3 However, the app shall either be a quick web service (Requirement 5.3.1) or an anonymous service (5.3.2).
			An anonymous service does not document the IP addresses that make requests of the service. This will be tested with a suite that compares the IP addresses of clients. 
## 5.4 Environment Requirements
	5.4.1 Development Environment Requirements
		5.4.1.1 IDE -- Sublime Text and Vim
		5.4.1.2 Hardware -- MBP running OS 10.10.1 and Acer C7 Chromebook running ChromeOS and Ubuntu
		5.4.1.2 VCS -- Git, hosted in a private Github repo		
	5.4.2 Execution Environment Requirements
		5.4.2.1 For anonymous web app usage -- TorBrowser
		5.4.2.2 For non-anonymous web app usage -- a modern web browser, including IE