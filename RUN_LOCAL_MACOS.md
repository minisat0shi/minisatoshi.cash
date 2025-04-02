# Run Locally on macOS

This guide explains how to run this project locally on macOS using a simple web server. This ensures that assets like `main.css` and `main.js` load correctly, avoiding issues with the `file://` protocol in browsers like Safari.

## Prerequisites

- **Homebrew**: A package manager for macOS. Install it if you don’t have it yet (see below).
- **Terminal**: Use the built-in Terminal app on macOS.

## Setup Instructions

1. **Install Homebrew (if not already installed)**:
   - Open Terminal and run:
     ```bash
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Follow the prompts to complete installation.
   - Verify installation:
     ```bash
     brew -v
     ```
     You should see a version number (e.g., `4.2.0`).

2. **Install Node.js with Homebrew**:
   - Install Node.js (which includes npm):
     ```bash
     brew install node
     ```
   - Verify installation:
     ```bash
     node -v
     ```
     You should see a version (e.g., `v18.17.0`).

3. **Install `http-server` with Homebrew**:
   - Use Homebrew to install `http-server`:
     ```bash
     brew install http-server
     ```
   - Verify installation:
     ```bash
     http-server -v
     ```
     You should see a version (e.g., `v14.1.1`).

4. **Navigate to Your Project Folder**:
   - Open Terminal and change to your project directory. Replace `/path/to/your/project` with your actual folder path:
     ```bash
     cd /path/to/your/project
     ```
   - Example: If your project is in `~/Documents/my-website`, run:
     ```bash
     cd ~/Documents/my-website
     ```

5. **Start the Server**:
   - Run the following command to start `http-server`:
     ```bash
     http-server
     ```
   - By default, it serves your project on port `8080`. You’ll see output like:
     ```
     Starting up http-server, serving ./
     Available on:
       http://127.0.0.1:8080
       http://192.168.1.x:8080
     Hit CTRL-C to stop the server
     ```

6. **Open in Browser**:
   - Open Safari (or any browser) and go to:
     ```
     http://localhost:8080
     ```
   - If your main HTML file isn’t named `index.html`, specify it in the URL (e.g., `http://localhost:8080/myfile.html`).

## Stopping the Server
- To stop `http-server`, press `Ctrl + C` in Terminal.

## Troubleshooting
- **Port Conflict**: If port `8080` is in use, specify a different port:
  ```bash
  http-server -p 3000