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

Across all artifacts, I applied consistent evaluation criteria:

### **Existing Functionality**
Understanding the original logic and workflow before modifying anything.

### **Code Analysis**
Focused on:

- Architecture and structure  
- Logic clarity and decision flow  
- Performance and efficiency  
- Security posture  
- Input validation  
- Error handling  
- Documentation + comments  

### **Enhancement Planning**
Each artifact received a targeted improvement plan aligned with its category and CS 499 outcomes.

---

# Enhancement One  
## **Software Engineering and Design**  
### **Artifact: Travlr Getaways Full Stack Web Application (CS 465)**

This MEAN stack application initially lacked secure routes, consistent API structure, clear model validation, and scalable architecture.

### **Issues Identified**

- Incomplete RESTful API structure  
- Missing authentication for admin pages  
- Weak error responses and inconsistent messaging  
- Angular services and components mixed concerns  
- Minimal validation in Mongoose schema  

### **Enhancement Plan**

- Implement JWT authentication with Passport  
- Secure all admin routes and enforce authorization  
- Add Mongoose validation rules  
- Refactor Angular app into modular services and interceptors  
- Improve response messaging and error structure  

---

# Enhancement Two  
## **Algorithms and Data Structures**  
### **Artifact: Deep Q Learning Cartpole Project (CS 370)**

This reinforcement learning project required improvements in algorithm clarity, replay memory scheduling, and convergence reporting.

### **Issues Identified**

- Fixed epsilon value → did not adapt to learning progress  
- Replay memory lacked strategy for batch updates  
- No time complexity explanation  
- Comments were minimal or missing  
- Output did not show convergence patterns clearly  

### **Enhancement Plan**

- Add win-rate-based epsilon decay  
- Add replay warm-up phase and scheduled batch training  
- Document time complexity in code header  
- Rewrite comments for clarity and readability  
- Add structured training output (loss, episodes, win rate)  

---

# Enhancement Three  
## **Databases**  
### **Artifact: Weight Tracking Mobile App (CS 360)**

This Android SQLite-based weight tracking app originally stored data without encryption and had minimal validation and documentation.

### **Issues Identified**

- Passwords stored in plain text  
- No AES encryption for weight data  
- Unoptimized or repetitive queries  
- No parameterized SQL statements  
- Limited CRUD documentation  
- Weak error handling  

### **Enhancement Plan**

- Implement SHA-256 secure password hashing  
- Add AES encryption for weight and goal fields  
- Refactor queries using parameterized statements  
- Improve database helper structure + CRUD documentation  
- Add user-friendly error handling  

---

# Code Review Video  
### Full Review of All Three Artifacts

🎥 **Video Link:**  
**https://youtu.be/rEKlZLvnlIg**

[![Watch the Code Review Video](https://img.shields.io/badge/YouTube-Code_Review-red?logo=youtube&logoColor=white)](https://youtu.be/rEKlZLvnlIg)

<div style="text-align: center;">
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 900px; margin: 0 auto;">
        <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
            src="https://www.youtube.com/embed/rEKlZLvnlIg" 
            title="CS 499 Code Review – Travlr Getaways, Deep Q Learning Cartpole, and Weight Tracking App" 
            frameborder="0" 
            allowfullscreen>
        </iframe>
    </div>
    <p><em>Figure 1 – Video code review covering all three capstone artifacts.</em></p>
</div>

---

<div style="text-align: right;">
    <a href="#top">
        <button style="font-size: 10px; font-weight: 500; background: #6A5ACD; color: #ffffff; border-radius: 50px; padding: 5px 8px;">
            Back to Top ↑
        </button>
    </a>
</div>
