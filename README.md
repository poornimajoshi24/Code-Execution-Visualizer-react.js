🧠 Code Execution Visualizer

An interactive Code Execution Visualizer built with React.js that helps users understand how code runs internally — including call stack behavior, memory allocation, recursion trees, and algorithm complexity.

✨ Features

📜 Live Code Editor

▶️ Step-by-step code execution

📦 Call Stack Visualization

🧠 Memory Heap Simulation

🌳 Recursion Tree Visualization

📊 Time & Space Complexity Analyzer

🎬 Execution Controls (Play, Pause, Step Forward)

🎨 Clean and Interactive UI

🏗️ Project Structure
src/
│
├── components/
│   ├── Controls/
│   ├── Editor/
│   ├── Layout/
│   ├── Visualizers/
│
├── engine/
│   ├── executionEngine.js
│   ├── memorySimulator.js
│   ├── recursionTracer.js
│   ├── complexityAnalyzer.js
│
├── store/
├── hooks/
├── data/
⚙️ Tech Stack

React.js

JavaScript (ES6+)

Custom Execution Engine

CSS for styling

🖥️ How It Works

User writes or selects an algorithm.

Execution Engine parses the code.

The system simulates:

Function calls → Call Stack

Variable allocation → Memory Heap

Recursive calls → Recursion Tree

Visual components update step-by-step.

📦 Installation & Setup
# Clone the repository
git clone https://github.com/YOUR-USERNAME/code-execution-visualizer.git

# Navigate into project
cd code-execution-visualizer

# Install dependencies
npm install

# Run development server
npm start

App runs at:

http://localhost:3000
🎯 Use Cases

Data Structures & Algorithms learning

Understanding recursion visually

Interview preparation

Teaching programming concepts

🔮 Future Improvements

Support for multiple languages (Python, C++)

Real AST parsing instead of simulated execution

Breakpoint support

Timeline-based execution history

Dark mode toggle

Deployment with backend execution sandbox

