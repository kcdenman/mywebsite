// Initialize chat history
let chatHistory = [];

// Add initial greeting
window.addEventListener('DOMContentLoaded', () => {
    addMessage('assistant', "Hello! I'm your AI assistant. How can I help you today?");
});

// Handle form submission
document.getElementById('chatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const messageInput = document.getElementById('messageInput');
    const userMessage = messageInput.value.trim();
    
    if (!userMessage) return;
    
    // Add user message to chat
    addMessage('user', userMessage);
    messageInput.value = '';
    
    try {
        // Show loading state
        const loadingMessage = addMessage('assistant', '...');
        
        // Call our server endpoint
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userMessage,
                history: chatHistory
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }
        
        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;
        
        // Update chat history
        chatHistory.push(
            { role: "user", content: userMessage },
            { role: "assistant", content: assistantMessage }
        );
        
        // Update loading message with actual response
        loadingMessage.textContent = assistantMessage;
        
    } catch (error) {
        console.error('Error:', error);
        addMessage('assistant', 'Sorry, I encountered an error. Please try again.');
    }
});

// Helper function to add messages to the chat
function addMessage(role, content) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;
    messageDiv.textContent = content;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return messageDiv;
} 