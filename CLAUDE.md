# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is Kevin Denman's personal website with two main components:

### Static Website
- **Main Site**: Static HTML/CSS website served from root directory
- **Pages**: `index.html` (about), `portfolio.html`, `philosophy.html`, `blog.html`, and individual blog posts in `/blog/`
- **Assets**: Static files in `/files/` including images, PDFs, and favicon assets
- **Styling**: Single `styles.css` file with responsive design and mobile-friendly navigation

### Chat Server (Node.js/Express)
- **Location**: `/chat-server/` directory 
- **Purpose**: AI-powered chat interface that acts as Kevin's personal assistant
- **API**: RESTful endpoints for chat functionality and configuration
- **Tools System**: Modular tool architecture in `/chat-server/tools/` for lead generation and conversation handling

## Development Commands

### Chat Server
```bash
cd chat-server
npm install
npm start  # Starts server on port 3000 (or PORT env var)
```

### Static Website
- No build process required - static HTML/CSS/JS files
- Serve locally with any static file server or open HTML files directly

## Key Technologies

- **Backend**: Node.js, Express.js
- **AI Integration**: Venice AI API (llama-3.3-70b model)
- **Tools**: Google Sheets integration
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Hosting**: Render.com for chat server, static hosting for website

## Architecture Notes

### Chat System Design
- **AI Assistant**: Scoped specifically to Kevin Denman's professional information
- **Tool Manager**: Handles dynamic tool execution including lead generation and conversation routing
- **CORS Configuration**: Configured for production domain (kevindenman.xyz) and local development
- **Environment Variables**: Uses dotenv for API keys and configuration

### Content Management
- **Blog Posts**: Individual HTML files in `/blog/` directory
- **Portfolio Data**: Embedded directly in chat server's system prompt for AI assistant
- **Static Assets**: Centralized in `/files/` directory with organized favicon variants

### Integration Points
- **Google Sheets**: For data tracking and lead logging
- **Venice AI**: For natural language processing and conversation handling

## Environment Variables Required

For chat server functionality:
- `VENICE_API_KEY`: API key for Venice AI service
- `GOOGLE_SHEET_WEBHOOK_URL`: Google Sheets webhook URL for lead data
- `PORT`: Server port (defaults to 3000)

## Development Notes

- Chat server runs on different port/domain than static site in production
- AI assistant has strict scoping to prevent off-topic conversations
- Tool system is extensible via `/chat-server/tools/toolManager.js`
- Static site uses Google Analytics tracking
- Mobile-responsive design with flexible header layout