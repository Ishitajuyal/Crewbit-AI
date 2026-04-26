# Crewbit

A modular HR automation platform combining advanced AI (using FastAPI, LLMs/Ollama, and React) to answer employee queries and automate HR workflows.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Project Structure Overview](#project-structure-overview)
- [Setup Instructions](#setup-instructions)
- [Running the Backends and Frontend](#running-the-backends-and-frontend)
- [Using the Application](#using-the-application)
- [Ollama Model Management Notes](#ollama-model-management-notes)
- [Stopping the Application](#stopping-the-application)
- [Features](#features)
- [Support & Contributions](#support--contributions)
- [License](#license)

---

## Project Overview

The HR AI Agent streamlines HR operations by leveraging AI-driven natural language processing for instant answers, PDF policy search, and advanced sentiment analysis. Built with Python (FastAPI backend), Node.js (Express server, MongoDB), and React (frontend), it empowers HR teams and employees with a seamless policy query and knowledge management experience.

---

## Prerequisites

1. Install **Python 3.11+**  
   - [https://www.python.org/downloads/](https://www.python.org/downloads/)

2. Install **Node.js (LTS) & npm**  
   - [https://nodejs.org/](https://nodejs.org/)

3. Install **Ollama CLI**  
   - [https://ollama.com/docs/install](https://ollama.com/docs/install)  
   - Ensure Ollama CLI is in your PATH.

4. Confirm installations:

python --version
node --version
npm --version
ollama --version

If not recognized, install or fix your PATH.

---
``` bash

Crewbit/
│
├── backend/
│   ├── main.py               # FastAPI backend entry point
│   ├── requirements.txt      # Python dependencies
│   ├── hr_agent.py           # Core HR AI logic
│   ├── sentiment.py          # Sentiment analysis module
│   ├── vectorstore.py        # Vector database utilities
│   └── ...                   # Additional backend modules
│
├── frontend/
│   ├── package.json          # React app dependencies
│   ├── package-lock.json     # Locked dependency versions
│   ├── public/               # Static assets (index.html, favicon, etc.)
│   ├── src/                  # React components, pages, and API calls
│   └── README.md             # (Optional) frontend guide
│
├── setup.bat                 # Windows setup script for dependencies & Ollama models
└── README.md                 # Main setup and usage guide (this file)


```
---

## Setup Instructions

1. Open Command Prompt or PowerShell in the project root:  
   `HR-AI-AGENT/`

2. Run the setup script:
   - `.\setup.bat`    (PowerShell)
   - `setup.bat`      (Command Prompt)

3. The script will:
   - Verify Ollama CLI is installed.
   - Pull required Ollama models:
       - llama3.2
       - mxbai-embed-large
   - Create a Python virtual environment at `backend/venv`.
   - Install backend Python dependencies.
   - Install frontend Node.js dependencies.

4. If any errors occur (e.g., Ollama missing), follow on-screen instructions and rerun as needed.

---

## Running the Backends and Frontend

### 1. FastAPI Backend Server (AI API)

cd backend
call venv\Scripts\activate
uvicorn main:app --reload --port 9001

- Access at: http://localhost:9001

### 2. Express Backend with MongoDB

cd backend
npm run dev

- Access at: http://localhost:8000

### 3. Frontend (React App)

cd frontend
npm start

- App opens at: http://localhost:3000

---

## Using the Application

- The app frontend: http://localhost:3000
- Key navigation:
  - Upload multiple HR policy PDFs (“HR Policy Upload” page)
  - Query policies (“Employee Query” page)
- Uploaded PDFs stored in: `backend/policy_uploads/`
- Embedded data stored at: `backend/chrome_langchain_db/`

---

## Ollama Model Management Notes

- Ollama CLI and required models must run on the backend server’s machine.
- Models power vector search and answers.
- List installed models:


- Pull/update models:

ollama pull <model-name>


- More info: https://ollama.com/docs

---

## Stopping the Application

- Stop any backend (FastAPI/Node) or frontend: **Ctrl+C** in its terminal.

---

## Features

- Instant employee query support using advanced LLMs
- PDF HR policy upload and search
- Sentiment analysis for HR chat
- Modular backend (FastAPI + Node)
- React-based modern UI

---

## Support & Contributions

- Contributions are welcome! Open issues or submit PRs for improvements.
- For support, create a GitHub issue or contact your maintainer.

---

## License

MIT License.  
See `LICENSE` file for details.

---

Thank you for using the HR AI Agent!
