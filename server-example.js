// Example Node.js server for OpenAI API integration
// This is for future upgrade to more advanced AI capabilities

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Knowledge base about Kevin (same as client-side version)
const kevinKnowledgeBase = {
    personal: {
        name: "Kevin Denman",
        location: "Based in the United States",
        birth_year: 1988,
        generation: "Millennial"
    },
    education: {
        degree: "Bachelor of Science in Industrial Engineering (Systems Engineering)",
        university: "West Virginia University",
        background: "Initially studied Finance before transferring to Engineering"
    },
    bitcoin_crypto: {
        discovery: "First learned about Bitcoin in 2015",
        philosophy: "Bitcoin has more potential than the Internet to fundamentally disrupt human civilization",
        opportunity: "Crypto represents his once-in-a-lifetime opportunity to make a real impact"
    },
    current_work: {
        morpheus: "Contributor working on The MOR Builders Accelerator",
        the_graph: "Business Development and Partnerships at Edge & Node"
    },
    previous_experience: [
        "Head of Strategy & Growth at Strangelove (Cosmos)",
        "Director of Business Development at Optoro",
        "Co-Founder at Sights (Data Analytics)",
        "Technology Consultant at Deloitte Consulting"
    ],
    skills: [
        "Systems Engineering",
        "Business Development", 
        "Partnerships",
        "Go-to-Market Strategy",
        "Blockchain Technology"
    ],
    contact: {
        twitter: "@kcdenman",
        telegram: "@kevindenman", 
        linkedin: "/in/kcdenman/",
        github: "kcdenman"
    }
};

// Simple response generation (fallback if OpenAI is not available)
function generateSimpleResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('bitcoin') || message.includes('crypto')) {
        return "Kevin first learned about Bitcoin in 2015 and has been deeply involved in the crypto space since. He currently works with The Graph and Morpheus, focusing on business development and partnerships.";
    }
    
    if (message.includes('current') || message.includes('working')) {
        return "Kevin is currently a contributor to Morpheus, working on The MOR Builders Accelerator, and also works in Business Development and Partnerships at Edge & Node on The Graph protocol.";
    }
    
    if (message.includes('background') || message.includes('experience')) {
        return "Kevin has a Systems Engineering degree from West Virginia University and has worked at companies like Deloitte Consulting, Optoro, and co-founded Sights before focusing on crypto projects.";
    }
    
    if (message.includes('contact') || message.includes('reach')) {
        return "You can reach Kevin through Twitter (@kcdenman), Telegram (@kevindenman), LinkedIn (/in/kcdenman/), or GitHub (kcdenman).";
    }
    
    return "I can help you learn about Kevin's background in crypto, business development, and his current projects. What would you like to know?";
}

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, context } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Option 1: Use simple rule-based responses
        const response = generateSimpleResponse(message);
        
        /* Option 2: Integrate with OpenAI API (uncomment when ready)
        
        const openai = require('openai');
        const client = new openai.OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // Add your API key to environment variables
        });

        const systemPrompt = `You are Kevin Denman's personal AI assistant. Use the following information about Kevin to answer questions accurately and helpfully:

        ${JSON.stringify(kevinKnowledgeBase, null, 2)}

        Guidelines:
        - Answer questions about Kevin's background, experience, and current projects
        - Be friendly and professional
        - If you don't know something specific, say so and suggest contacting Kevin directly
        - Keep responses concise but informative
        - Focus on Kevin's expertise in crypto, business development, and systems engineering`;

        const completion = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            max_tokens: 300,
            temperature: 0.7
        });

        const response = completion.choices[0].message.content;
        */

        res.json({ 
            response: response,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ 
            error: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date().toISOString()
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Kevin\'s AI Assistant API is running',
        timestamp: new Date().toISOString()
    });
});

// Serve the main chat page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat-assistant.html');
});

// Start server
app.listen(port, () => {
    console.log(`Kevin's AI Assistant server running at http://localhost:${port}`);
    console.log('Available endpoints:');
    console.log('  GET  /                - Chat interface');
    console.log('  POST /api/chat        - Chat API');
    console.log('  GET  /api/health      - Health check');
});

module.exports = app;

/* 
SETUP INSTRUCTIONS:

1. Install dependencies:
   npm init -y
   npm install express cors

2. For OpenAI integration (optional):
   npm install openai
   
3. Set environment variables:
   export OPENAI_API_KEY="your-api-key-here"
   
4. Run the server:
   node server-example.js

5. Update client-side JavaScript to use API:
   - Replace generateResponse() with fetch calls to /api/chat
   - Handle loading states and errors appropriately
   
EXAMPLE CLIENT-SIDE UPDATE:

async generateResponse(userMessage) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: userMessage,
                context: this.knowledgeBase 
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Chat API error:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
}
*/ 