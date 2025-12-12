#!/usr/bin/env python3
"""
Shikshak Mitra AI - Automated Setup Script
Installs all dependencies and configures the system
"""

import os
import subprocess
import sys
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        return False

def setup_environment():
    """Set up the complete environment"""
    print("🚀 Starting Shikshak Mitra AI Setup...")
    
    # Create .env file if it doesn't exist
    if not os.path.exists('.env'):
        print("📝 Creating .env file...")
        with open('.env', 'w') as f:
            f.write("OPENAI_API_KEY=your-openai-api-key-here\n")
            f.write("DEBUG=True\n")
        print("✅ .env file created. Please add your OpenAI API key.")
    
    # Install Python dependencies
    commands = [
        ("pip install -r requirements.txt", "Installing Python dependencies"),
        ("pip install -r \"AI Video Analyzer/requirements.txt\"", "Installing Video Analyzer dependencies"),
        ("pip install -r RAG_System/requirements.txt", "Installing RAG System dependencies"),
        ("pip install -r Teacher_Analytics_Visualization/requirements.txt", "Installing Visualization dependencies"),
        ("npm install", "Installing Node.js dependencies")
    ]
    
    for command, description in commands:
        if not run_command(command, description):
            print(f"⚠️ Warning: {description} failed, continuing...")
    
    print("\n🎉 Setup completed!")
    print("📋 Next steps:")
    print("1. Add your OpenAI API key to .env file")
    print("2. Run 'npm run dev' to start the frontend")
    print("3. Run 'python RAG_System/openai_integration.py' to test AI integration")
    print("4. Open Teacher_Analytics_Visualization/outputs/ for interactive dashboards")

if __name__ == "__main__":
    setup_environment()