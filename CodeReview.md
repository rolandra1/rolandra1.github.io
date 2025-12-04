---
layout: default
---

[![Generic badge](https://img.shields.io/badge/language-Markdown_|_HTML-blue.svg)](https://www.markdownguide.org/) 
[![Generic badge](https://img.shields.io/badge/tool-GitHub_Desktop-darkorchid.svg)](https://desktop.github.com/) 
[![Generic badge](https://img.shields.io/badge/editor-Markdown_Monster-mediumvioletred.svg)](https://markdownmonster.west-wind.com/) 
[![Generic badge](https://img.shields.io/badge/license-MIT-limegreen.svg)](LICENSE)

---

# Code Review and Refinement Plan

---

This document presents my code review and refinement plan for the three artifacts selected for my CS 499 Capstone. The purpose of the code review process is to evaluate each artifact for weaknesses, limitations, security concerns, and areas for improvement. Through this process, I developed a structured approach to analyzing code while improving my ability to communicate technical information clearly and professionally.

The artifacts reviewed represent the three categories required for the ePortfolio:

- Software Engineering and Design  
- Algorithms and Data Structures  
- Databases  

Each code review helped me identify the current functionality, analyze the design, evaluate performance, detect vulnerabilities, and create a practical enhancement plan.

---

## Review Method and Evaluation Focus

During the review of all three artifacts, I used the same evaluation criteria to remain consistent:

### Existing Functionality
I described how the current code works and identified the purpose of the main components. This helped me document the strengths of the original design and gain a full understanding of its workflow before making changes.

### Code Analysis
I analyzed:
- Structure and organization  
- Logic and decision flow  
- Efficiency and performance  
- Security posture  
- Error handling  
- Documentation and comments  

This step revealed important areas where each artifact could be improved.

### Enhancement Plan
For each artifact, I created a targeted plan that includes structural refinement, security improvements, performance enhancements, better documentation, and new features where needed.

---

# Enhancement One  
## Software Engineering and Design  
### Artifact: **Treasure Hunt Deep Q Learning Game (CS 370)**

This artifact is a Python project created in Jupyter Notebook. It uses deep Q learning to train an intelligent agent to move through an eight by eight maze and find a treasure. I selected this artifact for the Software Engineering and Design category because it demonstrates my ability to work with modular code, neural networks, reinforcement learning, and program structure.

### Issues Found During Code Review
- Inconsistent variable naming patterns  
- Lack of detailed comments inside critical functions  
- Missing defensive checks for invalid game states  
- Limited error handling during training  
- No visual communication indicators for training progress  
- Replay memory used without clear documentation of its behavior  

### Enhancement Plan
- Improve variable naming to enhance clarity  
- Add comments explaining each training step  
- Add safe checks for out of range positions and invalid moves  
- Add exceptions and user feedback messages  
- Improve structure inside the qtrain function to separate concerns  
- Add detailed training metrics to improve communication  

These changes increase readability, maintainability, and reliability of the machine learning workflow.

---

# Enhancement Two  
## Algorithms and Data Structures  
### Artifact: **Weight Tracker Mobile App Database Logic (CS 360)**

The artifact selected for this category is the Java based mobile app originally created for CS 360. It includes user authentication, item storage, and inventory management using SQLite as the database. This artifact represents my understanding of data structures and algorithmic logic inside a mobile environment.

### Issues Found During Code Review
- Passwords stored without secure hashing  
- Queries not optimized and repeated unnecessarily  
- Limited error handling for database access  
- Some functions lacked input validation  
- No protection against SQL injection  
- Missing documentation for important CRUD operations  

### Enhancement Plan
- Add SHA 256 password hashing  
- Replace raw queries with parameterized statements  
- Validate all input before database interaction  
- Refactor CRUD operations for clarity and efficiency  
- Add structured comments in all database helper functions  
- Implement user friendly error messages  

These improvements strengthen the algorithmic logic inside the app and establish a secure and efficient data flow.

---

# Enhancement Three  
## Databases  
### Artifact: **Travlr Getaways Full Stack Web Application (CS 465)**

This artifact is a full stack MEAN application developed originally in CS 465. The project was migrated from a server side Handlebars version to a modern Angular application with a Node.js and Express API. MongoDB stores trip information with the Mongoose ORM.

### Issues Found During Code Review
- API routes did not follow a clean RESTful structure  
- Missing authentication around admin routes  
- Inconsistent error responses from the server  
- Angular services lacked retry logic and consistent error handling  
- Some parts of the database schema lacked validation  
- No token handling for protected operations  

### Enhancement Plan
- Add JWT authentication with Passport  
- Secure all admin routes and separate user access levels  
- Add validation rules inside Mongoose models  
- Add Angular interceptors for token injection  
- Improve API structure and documentation  
- Add clear server responses for errors  

These enhancements support the security mindset outcome while modernizing the architecture for better performance and protection.

---

# Code Review Video  
### Review of All Three Artifacts

<div style="text-align: center;">
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
        <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://youtu.be/389YtSmOUXU" 
        title="Code Review Video" 
        frameborder="0" allowfullscreen></iframe>
    </div>
    <p><em>Figure 1 - Full Code Review Video of the three artifacts</em></p>
</div>

---

<div style="text-align: right;">
    <a href="#top">
        <button style="font-size: 10px; font-weight: 500; background: #6A5ACD; color: #ffffff; border-radius: 50px; padding: 5px 8px;">Back to Top ↑</button>
    </a>
</div>

