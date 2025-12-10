# Deep Q-Learning Treasure Hunt Game

### Algorithms and Data Structures Enhancement – CS-499

This project is a reinforcement learning simulation where a pirate agent learns to navigate an 8×8 maze to find treasure. It uses Deep Q-Learning, experience replay, and a neural network.

## Capstone Enhancements Included

1. Epsilon Adjustment (Exploration Control)
   The agent now starts with more exploration and reduces it after achieving a strong win rate.
   This improves stability and helps the model trust its learned behavior.

2. Replay Memory Optimization
   The experience buffer now trains using controlled mini-batches instead of training after every step.
   This reduces correlation in samples and increases efficiency.

3. Algorithmic Documentation
   I added clear and simple explanations of:

- Training loop complexity
- Mini-batch update cost
- Memory structure behavior
- Exploration–exploitation strategy

4. Improved Code Comments

All logic inside qtrain() has been rewritten with fully polished, simple English explanations to support maintainability and capstone communication standards.

## 📂 Files Included in This Repository

File - Description

- TreasureHuntGame-enhanced.ipynb - Main Jupyter Notebook with the enhanced training function
- TreasureMaze.py - Environment representation and maze logic
- GameExperience.py - Replay memory class that stores training transitions
- screenshots/ Folder containing training output, maze visuals, and performance evidence
- README.md - Documentation file for this artifact

## ▶️ How to Run the Project

1. Install Python 3.8 or newer
2. Install required libraries
   pip install numpy keras matplotlib

3. Open the notebook

- Run the file:
- TreasureHuntGame-enhanced.ipynb
- Run all cells from top to bottom.
  You will see:
- Maze visualization
- Training progress updates
- Loss reduction
- Win rate improvement

Final model achieving near-perfect or perfect performance

## 📸 Screenshots Included

Screenshots captured during enhancement:

- Training output showing convergence and 100% win rate
- Maze visualization (pirate and treasure positions)
- Completion check results
  These provide visual evidence of algorithm performance for the CS-499 milestone narrative.

## 👤 Author

Amos Roland
Computer Science Capstone – Southern New Hampshire University
