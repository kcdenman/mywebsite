// Embeddable chat widget for Kevin's website
(function() {
    'use strict';

    // Prevent multiple initializations
    if (window.KevinChatWidget) {
        return;
    }

    class KevinChatWidget {
        constructor() {
            this.isOpen = false;
            this.knowledgeBase = this.buildKnowledgeBase();
            this.createWidget();
            this.addStyles();
        }

        addStyles() {
            const styles = `
                .kevin-chat-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    display: none;
                    flex-direction: column;
                    z-index: 10000;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                }

                .kevin-chat-widget.open {
                    display: flex;
                }

                .kevin-widget-toggle {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    transition: all 0.3s;
                    z-index: 10001;
                }

                .kevin-widget-toggle:hover {
                    transform: scale(1.1);
                }

                .kevin-chat-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 1rem;
                    text-align: center;
                    border-radius: 15px 15px 0 0;
                    position: relative;
                }

                .kevin-chat-header h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 600;
                }

                .kevin-close-btn {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.3rem;
                    cursor: pointer;
                    opacity: 0.8;
                    transition: opacity 0.3s;
                }

                .kevin-close-btn:hover {
                    opacity: 1;
                }

                .kevin-chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                    background: #f8f9fa;
                    max-height: 350px;
                }

                .kevin-message {
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: flex-start;
                }

                .kevin-message.user {
                    justify-content: flex-end;
                }

                .kevin-message-content {
                    max-width: 80%;
                    padding: 0.75rem 1rem;
                    border-radius: 18px;
                    line-height: 1.4;
                    font-size: 0.9rem;
                }

                .kevin-message.assistant .kevin-message-content {
                    background: #e3f2fd;
                    color: #1565c0;
                    border-bottom-left-radius: 4px;
                }

                .kevin-message.user .kevin-message-content {
                    background: #667eea;
                    color: white;
                    border-bottom-right-radius: 4px;
                }

                .kevin-typing-indicator {
                    display: none;
                    padding: 0.75rem 1rem;
                    background: #e3f2fd;
                    border-radius: 18px;
                    border-bottom-left-radius: 4px;
                    max-width: 70%;
                    margin-bottom: 1rem;
                    color: #1565c0;
                    font-size: 0.9rem;
                }

                .kevin-typing-dots::after {
                    content: '';
                    animation: kevin-typing 1.5s infinite;
                }

                @keyframes kevin-typing {
                    0%, 20% { content: ''; }
                    40% { content: '.'; }
                    60% { content: '..'; }
                    80%, 100% { content: '...'; }
                }

                .kevin-chat-input-container {
                    padding: 1rem;
                    background: white;
                    border-top: 1px solid #e0e0e0;
                    border-radius: 0 0 15px 15px;
                }

                .kevin-chat-input-form {
                    display: flex;
                    gap: 0.5rem;
                }

                .kevin-chat-input {
                    flex: 1;
                    padding: 0.7rem;
                    border: 2px solid #e0e0e0;
                    border-radius: 20px;
                    outline: none;
                    font-size: 0.9rem;
                    font-family: inherit;
                }

                .kevin-chat-input:focus {
                    border-color: #667eea;
                }

                .kevin-send-button {
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s;
                    font-size: 1rem;
                }

                .kevin-send-button:hover {
                    background: #5a6fd8;
                }

                .kevin-send-button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .kevin-chat-widget {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 100px);
                        bottom: 20px;
                        right: 20px;
                        left: 20px;
                    }
                    
                    .kevin-widget-toggle {
                        bottom: 20px;
                        right: 20px;
                    }
                }
            `;

            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        createWidget() {
            // Create toggle button
            this.toggleButton = document.createElement('button');
            this.toggleButton.className = 'kevin-widget-toggle';
            this.toggleButton.innerHTML = '💬';
            this.toggleButton.setAttribute('aria-label', 'Chat with Kevin');

            // Create widget container
            this.widget = document.createElement('div');
            this.widget.className = 'kevin-chat-widget';
            this.widget.innerHTML = `
                <div class="kevin-chat-header">
                    <h3>🤖 Ask about Kevin</h3>
                    <button class="kevin-close-btn">&times;</button>
                </div>
                <div class="kevin-chat-messages">
                    <div class="kevin-message assistant">
                        <div class="kevin-message-content">
                            👋 Hi! I'm Kevin's AI assistant. I can answer questions about his background in crypto, business development, and experience. What would you like to know?
                        </div>
                    </div>
                </div>
                <div class="kevin-typing-indicator">
                    <span class="kevin-typing-dots">Typing</span>
                </div>
                <div class="kevin-chat-input-container">
                    <form class="kevin-chat-input-form">
                        <input type="text" class="kevin-chat-input" placeholder="Ask about Kevin..." autocomplete="off">
                        <button type="submit" class="kevin-send-button">📤</button>
                    </form>
                </div>
            `;

            document.body.appendChild(this.toggleButton);
            document.body.appendChild(this.widget);

            this.setupEventListeners();
        }

        setupEventListeners() {
            // Toggle button
            this.toggleButton.addEventListener('click', () => {
                this.toggleWidget();
            });

            // Close button
            this.widget.querySelector('.kevin-close-btn').addEventListener('click', () => {
                this.closeWidget();
            });

            // Chat form
            const form = this.widget.querySelector('.kevin-chat-input-form');
            const input = this.widget.querySelector('.kevin-chat-input');
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMessage(input.value.trim());
            });
        }

        toggleWidget() {
            if (this.isOpen) {
                this.closeWidget();
            } else {
                this.openWidget();
            }
        }

        openWidget() {
            this.isOpen = true;
            this.widget.classList.add('open');
            this.toggleButton.style.display = 'none';
            
            // Focus input
            setTimeout(() => {
                this.widget.querySelector('.kevin-chat-input').focus();
            }, 100);
        }

        closeWidget() {
            this.isOpen = false;
            this.widget.classList.remove('open');
            this.toggleButton.style.display = 'flex';
        }

        async handleMessage(message) {
            if (!message) return;

            const input = this.widget.querySelector('.kevin-chat-input');
            const sendButton = this.widget.querySelector('.kevin-send-button');
            const messagesContainer = this.widget.querySelector('.kevin-chat-messages');
            const typingIndicator = this.widget.querySelector('.kevin-typing-indicator');

            // Disable input
            input.disabled = true;
            sendButton.disabled = true;

            // Add user message
            this.addMessage(message, 'user');
            input.value = '';

            // Show typing indicator
            typingIndicator.style.display = 'block';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            try {
                // Simulate thinking time
                await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500));
                
                const response = this.generateResponse(message);
                
                // Hide typing indicator
                typingIndicator.style.display = 'none';
                
                // Add response
                this.addMessage(response, 'assistant');
                
            } catch (error) {
                typingIndicator.style.display = 'none';
                this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
                console.error('Chat error:', error);
            } finally {
                // Re-enable input
                input.disabled = false;
                sendButton.disabled = false;
                input.focus();
            }
        }

        addMessage(content, sender) {
            const messagesContainer = this.widget.querySelector('.kevin-chat-messages');
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `kevin-message ${sender}`;
            
            const messageContent = document.createElement('div');
            messageContent.className = 'kevin-message-content';
            messageContent.textContent = content;
            
            messageDiv.appendChild(messageContent);
            messagesContainer.appendChild(messageDiv);
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        buildKnowledgeBase() {
            return {
                // Same knowledge base as the full chat assistant
                // ... (knowledge base content would be identical to the main chat assistant)
            };
        }

        generateResponse(userMessage) {
            const message = userMessage.toLowerCase();
            
            // Bitcoin/Crypto related questions
            if (message.includes('bitcoin') || message.includes('crypto') || message.includes('blockchain')) {
                if (message.includes('when') && (message.includes('start') || message.includes('begin') || message.includes('learn'))) {
                    return "Kevin first learned about Bitcoin in 2015 and quickly became obsessed with it. He believes that nothing since the Internet has had more potential to fundamentally disrupt human civilization. As a millennial born in 1988, he didn't get to help build the Internet, so crypto represented his once-in-a-lifetime opportunity to make a real impact.";
                }
                if (message.includes('philosophy') || message.includes('believe') || message.includes('think')) {
                    return "Kevin has a strong belief that Bitcoin and cryptocurrency represent the most significant technological advancement since the Internet. He sees crypto as having more potential than the Internet to fundamentally disrupt human civilization.";
                }
                return "Kevin has been deeply involved in the crypto space since 2015. He currently works with The Graph and Morpheus, and previously held key roles at Cosmos/Strangelove. His expertise spans business development, partnerships, and go-to-market strategies for blockchain projects.";
            }

            // Current work questions
            if (message.includes('current') || message.includes('now') || message.includes('today') || message.includes('working')) {
                return "Kevin is currently working on multiple crypto projects: He's a contributor to Morpheus, working on The MOR Builders Accelerator, and also works in Business Development and Partnerships at Edge & Node on The Graph protocol.";
            }

            // Experience/background questions
            if (message.includes('experience') || message.includes('background') || message.includes('career') || message.includes('work')) {
                return "Kevin has a diverse background spanning both traditional tech and crypto. He has a Systems Engineering degree from West Virginia University. Before crypto, he worked at Deloitte Consulting, co-founded Sights (a data analytics startup), and was Director of Business Development at Optoro. In crypto, he's held leadership roles at Cosmos/Strangelove, The Graph, and Morpheus.";
            }

            // Education questions
            if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('study')) {
                return "Kevin has a Bachelor of Science degree in Industrial Engineering (Systems Engineering) from West Virginia University. He initially studied Finance before transferring to Engineering, giving him both technical and financial market understanding.";
            }

            // Skills questions
            if (message.includes('skill') || message.includes('expertise') || message.includes('good at') || message.includes('specialize')) {
                return "Kevin's unique superpower is combining his technical background in systems engineering with his business development skills. He excels at business development, partnerships, go-to-market strategy, and operations management in crypto/blockchain, enterprise software, and fintech.";
            }

            // Company-specific questions
            if (message.includes('morpheus') || message.includes('mor')) {
                return "At Morpheus (mor.org), Kevin is a contributor working on The MOR Builders Accelerator (morbuilders.xyz). He maintains the accelerator to help builders and facilitates connections across capital, code, compute, and community.";
            }

            if (message.includes('graph') || message.includes('edge') || message.includes('node')) {
                return "Kevin works in Business Development and Partnerships at Edge & Node, the company behind The Graph protocol. He focuses on go-to-market strategies for chain integrations and protocol partnerships.";
            }

            // Contact questions
            if (message.includes('contact') || message.includes('reach') || message.includes('social') || message.includes('twitter') || message.includes('linkedin')) {
                return "You can reach Kevin through Twitter/X (@kcdenman), Telegram (@kevindenman), LinkedIn (/in/kcdenman/), GitHub (kcdenman), or Chess.com (kevincdenman). He's also on Nounspace at /s/basedchad/Profile.";
            }

            // Greetings
            if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.length < 20) {
                return "Hi! I'm Kevin's AI assistant. I can help you learn about Kevin's background in crypto, business development, systems engineering, and his various projects. What would you like to know?";
            }

            // Default response
            return "I'd be happy to help you learn more about Kevin! You can ask me about his background in crypto (Bitcoin, The Graph, Morpheus, Cosmos), his business development experience, his education, or how to contact him. What interests you most?";
        }
    }

    // Initialize the widget when DOM is ready
    function initWidget() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.KevinChatWidget = new KevinChatWidget();
            });
        } else {
            window.KevinChatWidget = new KevinChatWidget();
        }
    }

    initWidget();

})(); 