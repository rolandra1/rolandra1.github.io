---
layout: default
---

<div id="top"></div>

[![Generic badge](https://img.shields.io/badge/language-Markdown_|_HTML-blue.svg)](https://www.markdownguide.org/) 
[![Generic badge](https://img.shields.io/badge/tool-GitHub_Desktop-darkorchid.svg)](https://desktop.github.com/) 
[![Generic badge](https://img.shields.io/badge/editor-Markdown_Monster-mediumvioletred.svg)](https://markdownmonster.west-wind.com/) 
[![Generic badge](https://img.shields.io/badge/license-MIT-limegreen.svg)](LICENSE)

---

# Code Review and Refinement Plan

This document presents my code review and refinement plan for the three artifacts selected for my CS 499 Capstone. The purpose of this process is to evaluate each artifact for weaknesses, limitations, security concerns, and areas for enhancement. This structured review strengthened my ability to communicate technical details professionally while identifying upgrades that support the CS 499 outcomes.

The three artifacts reviewed represent the required categories:

- **Software Engineering and Design**  
- **Algorithms and Data Structures**  
- **Databases**

---

## Review Method and Evaluation Focus

Across all artifacts, I applied consistent evaluation criteria.

### **Existing Functionality**

First, I described how the current code works and documented the main components and workflows. This step made sure I fully understood the behavior and intent of each artifact before proposing any changes.

### **Code Analysis**

Next, I evaluated the code with a focus on:

- Architecture and structure  
- Logic clarity and decision flow  
- Performance and efficiency  
- Security posture  
- Input validation  
- Error handling  
- Documentation and comments  

### **Enhancement Planning**

Finally, I built a targeted enhancement plan for each artifact that aligns with its category and the CS 499 outcomes. These plans guided the actual changes I implemented during the capstone.

---

# Enhancement One  
## **Software Engineering and Design**  
### **Artifact: Travlr Getaways Full Stack Web Application (CS 465)**

This MEAN stack application originally started as a server-rendered travel listing site without a fully structured RESTful API, strong authentication, or scalable architecture.

### **Issues Identified**

- Incomplete and inconsistent RESTful API structure  
- Missing authentication and authorization on admin routes  
- Weak or inconsistent error and status responses  
- Angular components tightly coupled to data access logic  
- Limited validation rules inside Mongoose models  

### **Enhancement Plan**

- Implement **JWT authentication** with Passport  
- Secure all admin routes and enforce proper authorization  
- Add **validation rules** in the Mongoose schemas for trips and users  
- Refactor Angular code into **modular services** and HTTP interceptors  
- Standardize API response formats and error messages for clarity  

These enhancements move the project toward a more professional full-stack architecture and better support the Software Engineering and Design outcome.

---

# Enhancement Two  
## **Algorithms and Data Structures**  
### **Artifact: Treasure Hunt Deep Q Learning Project (CS 370)**

This reinforcement learning project trains an agent to navigate an eight-by-eight maze and reach a treasure using Deep Q Learning. The original version needed clearer algorithm control, better replay memory usage, and more transparent training feedback.

### **Issues Identified**

- Fixed the epsilon value that did not adapt to the agent’s performance  
- Replay memory used without a structured warm-up or batch schedule  
- No explanation of **time complexity** for the main loops  
- Sparse or unclear comments inside the `qtrain()` function  
- Training output did not clearly show convergence patterns  

### **Enhancement Plan**

- Add a **win rate-based epsilon adjustment** to reduce exploration as performance improves  
- Introduce a **replay warm-up phase** and scheduled mini batch training steps  
- Document **time complexity** for the main training loop, replay sampling, and prediction calls  
- Rewrite comments using clear, human-friendly explanations for each training step  
- Add structured training output for **episodes, loss, rewards, and win rate** to visualize convergence  

These enhancements focus on algorithm design, data structure usage, and performance reasoning, which support the Algorithms and Data Structures outcome.

---

# Enhancement Three  
## **Databases**  
### **Artifact: Weight Tracking Mobile App (CS 360)**

This Android weight tracking app uses SQLite to store user accounts, goals, and daily weight entries. The original version stored sensitive data without proper protection and had limited validation and documentation.

### **Issues Identified**

- Passwords stored in plain text  
- Weight and goal values are not protected with encryption  
- Repetitive or unoptimized SQL queries  
- No parameterized statements to help prevent SQL injection  
- Minimal documentation of CRUD operations in the database helper  
- Limited error handling for database failures  

### **Enhancement Plan**

- Implement **SHA 256 hashing** for user passwords  
- Add **AES encryption** for weight and goal fields before saving to SQLite  
- Refactor queries into **parameterized SQL** for safety and clarity  
- Clean up and document all CRUD operations inside the database helper  
- Improve user-visible error handling and messaging for database operations  

These changes directly support secure, efficient, and well-documented database behavior for a mobile app.

---

# Code Review Video  
### Full Review of All Three Artifacts

🎥 **Video Link:**  
**https://youtu.be/rEKlZLvnlIg**

[![Watch the Code Review Video](https://img.shields.io/badge/YouTube-Code_Review-red?logo=youtube&logoColor=white)](https://youtu.be/rEKlZLvnlIg)

<div class="figure-center">
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 900px; margin: 0 auto;">
        <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
            src="https://www.youtube.com/embed/rEKlZLvnlIg" 
            title="CS 499 Code Review – Travlr Getaways, Treasure Hunt Deep Q Learning, and Weight Tracking App" 
            frameborder="0" 
            allowfullscreen>
        </iframe>
    </div>
    <p class="figure-caption"><em>Figure 1 – Code review video covering all three CS 499 capstone artifacts.</em></p>
</div>

---

<div style="text-align: right;">
    <a href="#top">
        <button class="back-to-top" style="background: #6A5ACD; color: #ffffff; border-color: #6A5ACD;">
            Back to Top ↑
        </button>
    </a>
</div>
