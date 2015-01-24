Description
-----------
    Pitkin is an secure journalism app. End users that intend to publish on the platform will have the ability to research and compose on a Tor service, meaning that their IP addresses will be obscured. An externality of this feature is that research and drafting is only accessible while the end-user has Tor-enabled. In contrast, accessing the web-app as a reader will not require Tor to be enabled, though the articles themselves can be published anonymously.

    Some elements of Pitkin exist already, and these existing services will make up some of the plumbing of my project. For example, DuckDuckGo and Startpage are quality search engines that do not track IP addresses, and the former provides an API. Similarly, Tor has been used to anonymize IRC for a while, and I'll investigate how those are implemented.

    There are really three parties of end-users for Pitkin. I think of the primary end-user to be the journalist, or someone that seeks to write an article while securing their identity. The secondary end-user is anyone that is reading material that is published on the app. To this person, the app is basically a blogroll devoid of author names. The tertiary end-user is anyone that might be chatting securely with a primary end-user.

    Code will be hosted on a Github repo, so I'll end up maintaining it if anyone forks it. 
Justification
-------------

    1. Implementing a web-app is a logical demonstration of assorted skills from other classes in the CMSI curriculum. CMSI 401 gives lessons in the realities of project management, and best practices of software development. Since a web-app was designed in my 401 class, there ares specific technologies that carry over to what I am looking to do in 402, particularly in using Node.js.
    
    2. On its surface, the scope of the web-app is not far from a one man 402 project. So while I was largely on one team and occasionally dabbled in other team's work in 402, my niche will have to expand. For example, I was on the ingestion team for 401, making API calls and organizing 3rd party data into a useful data structure. Now, I'll have to also implement a front-end UI. Though I have studied and used those technologies, this will be the first time I tie them into my own project. This extends what I learned in CMSI 371.
    
    3. Web-apps are pretty regular projects for CMSI 402, indicating (to me, at least) that the requisite technical difficulty to implement one is considered appropriate for this course.
    
    4. See answer to 3, but I'll also add that the unique element of this project is security, which is only added time in proper configuration of the hardware hosting the application.
    
    5. I am familiar with most of the technologies necessary to implement the project. I anticipate that the technology that will take me the most time implement will be a database solution for this project. I used Mongo for my role in 402, but I am considering doing something else for this project.
    
    6. I hope that this project is as interesting for you as it is for me! 