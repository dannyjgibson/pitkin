## 5.1 Introduction
Pitkin is a Journalism web application. An end-user has the ability to research, write, and publish within the Pitkin web application. Each of the described functions is built out as its own small web app, which will pass properties of an Article Object between the apps to get to publication.
![pitkin-overview](http://i.imgur.com/KACGTNn.png)  
The remainder of this document is as follows. Section 5.2 contains Pitkin's functional requirements, with each subsection being a single functional requirement described in detail. Section 5.3 contains Pitkin's performance requirements, with a performance requirement described in detail in each subsection. Section 5.4 contains Pitkin's Environment Requirements, with subsextion 5.4.1 describing the Development Environment Requirements and 5.4.2 describing the Execution Environment Requirements.
## 5.2 Functional Requirements
The Functional Requirements of Pitkin desribe the basic functionality provided by the four subsystems of the web-app. Without specifying the performance/appearance of the functionality, a user should be able to "check off" the Functional Requirements listed here as they use the app. 
### 5.2.1 Chat
#### 5.2.1.1 
Chatrooms shall have unique room IDs that can be shared
#### 5.2.1.2 
Chatroom users shall be able to change their handle.
#### 5.2.1.3
Handles shall default to a number, derived from time in the room.
#### 5.2.1.4
Chat conversations shall be archivable.
#### 5.2.1.5 
Requirements 5.2.1.1 - 5.2.1.4 shall have both chat-box shortcuts and a GUI modal settings.
#### 5.2.2 Search
#### 5.2.2.1
The Search functionality shall return answers from DuckDuckGo.
#### 5.2.2.2
The Search GUI shall be a simple as Google's interface - Search bar and submit button.
#### 5.2.2.3
Search results shall be returned in a column pattern - one result per row.
#### 5.2.3 Draft
#### 5.2.3.1
End users shall be able to save files to a remote filesystems.
#### 5.2.3.2
End users shall be able to open files saved previously.
#### 5.2.3.3
Drafting shall support raw text.
#### 5.2.3.4
Considering Requirement 5.2.3.3, the drafting GUI shall be a single text input and save button.
### 5.2.4 Publication
#### 5.2.4.1 
Writers shall be able to tag articles for relevant subject matter.
#### 5.2.4.2
Readers shall be able to filter articles by date and by topic tags.
#### 5.2.4.3
Readers shall be able to flag offensive or repetitive material.
## 5.3 Performance Requirements
The Performance Requirements of Pitkin describe the performance of the Pitkin web app. These are easiest to gather using third party analytics. I plan to use the Google PageSpeed Insight test to provide the best experience I can for the users. So while a user should be able to check that Functional requirements are met, the Performance Requirements cannot be assessed by the human eye. 
### 5.3.1
The web app with a Desktop shall score 90+/100 on Google's PageSpeed Insights test. Google provides a service that hits URL and reports on the speed, structure, and readability of the URL.  I will run this against the public-facing URLs, and follow the suggestiosn of the tests to speed performance and enhance UX. 
### 5.3.2
Note for Requirement 5.3.1, if using app as a Tor Service, the load speed might suffer. Since one goal of the app is to host as a Tor Service, the speed of a site might suffer as it is served through Tor relays.  Since the traffic of the site might be routed through several machines, the app might slow down. It would probably be good form for me to start a Tor relay of my own as "pay-it-forward" for the non-profit. 
### 5.3.3
However, the app shall either be a quick web service (Requirement 5.3.1) or an anonymous service (5.3.2). An anonymous service does not document the IP addresses that make requests of the service. This will be tested with a suite that compares the IP addresses of clients. 
## 5.4 Environment Requirements
In the Age of the World Wide Web, the specs of the both the development and client machines should be not be that important. Instead, I focus on the set up I'll be developing on, as well as the browser specs necessary to use Pitkin.  
### 5.4.1 Development Environment Requirements
#### 5.4.1.1
IDE -- Sublime Text and Vim
#### 5.4.1.2
Hardware -- MBP running OS 10.10.1 and Acer C7 Chromebook running ChromeOS and Ubuntu
#### 5.4.1.3
VCS -- Git, hosted in a private Github repo
### 5.4.2 Execution Environment Requirements
##### 5.4.2.1
For anonymous web app usage -- TorBrowser
#### 5.4.2.2
For non-anonymous web app usage -- a modern web browser, including IE 11 and newer.


-----
### Instructor Notes and Feedback Comments
#### Introduction Section
1. The diagram is a good overview of the system.  You show three blocks, though, and you address four in your requirements.  The chat server and the search service are handled as separate blocks in the requirements, but are shown as components of the "Research" block on the diagram.  This might cause some confusion.
2. General comment -- WATCH YOUR SPELLING!  There are a couple of hasty mistakes, like "shall be a simple as ..." and "...to a remote filesystems."

#### Functional Requirements Section
1. 5.2.1.1 -- Need a bit better description of what unique room IDs will look like.  Also, specify what is meant by "shared", and make sure that it is clear that the IDs are being shared.
2. 5.2.1.2 -- Describe what is a "handle"
3. 5.2.1.3 -- Describe what you mean by "time in the room".
4. 5.2.1.4 -- Describe what is meant by "archiveable".  Where will they be archived?  How often?  If manually archived, by what mechanism does the user make this happen - a button, a text box, something else?
5. 5.2.1.5 -- Explain what is meant by GUI modal settings.  Provide at least one "will" statement that describes this, and another one that itemizes the chat box shortcuts that you will make available.
6. 5.2.2.2 -- "as simple as Google" isn't a good thing to include in a requirement; instead, just say what you are including: the search text box and the submit button.
7. 5.2.2.3 -- What information is returned from a search?  Assuming this is the search portion of the diagram, there needs to be at least half-a-dozen requirements just for this part.
8. 5.2.3.1 -- In what form will files be saved, raw text, formatted text, Word doc, PDF, ODT, other?  Specify.
9. 5.2.3.2 -- Describe the interface which users will be presented when opening files.
10. 5.2.4.1 -- What is the mechanism for the user tagging facility?  Do they click a button that is provided?  If that is the case, does the tag become associated with that item for all users, or just for that user? At least 4-5 more requirements here.
11. 5.2.4.2 -- What is the mechanism for filtering?  Will it be an advanced search, or will there be buttons and/or text boxes, etc.?  Specify more here.
12. 5.2.4.3 -- What happens when material is flagged as "offensive" -- is it subjected to some scrutiny and then removed?  Is there a filter to keep it from being presented to a user who doesn't want to see that information?  If so, what mechanisms are you including to make this happen?

#### Performance Requirements Section
1. You should make these into specifications.  For example, in 5.3.1, you can leave the explanation paragraph as it is, extract the "shall" statement into a sub-section requirement 5.3.1.1, then add a sub-section 5.3.1.2 that has a requirement, like "The web app shall be tailorable to incorporate the recommendations obtained from the Google PageSpeed Insights test."  Then follow up with either another requirement 5.3.1.3 to specify how frequently that test will be run.  BTW, 5.3.1, 5.3.2, and 5.3.3 should have some text, not just the numbers...
2. Sub-section 5.3.2 is really a "note", not a requirement; this is OK, but the text next to the 5.3.2 should let the user know.  In 5.3.3 you talk about a "quick" service vs. an "anonymous" service -- make sure to explain the distinction between these two things.

#### Environment Requirements Section
1. I'm not sure I entirely agree with the introduction -- there are frequently minimum specifications which need to be addressed.  Besides, aren't the "browser specs necessary" basically the environment anyhow?
2. These requirements need to be re-written as "shall" statements, not sentence fragments...  :)
3. Make sure you explain all acronyms on first use; e.g., say "Integrated Development Environment (IDE)"
