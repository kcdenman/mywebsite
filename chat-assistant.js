class ChatAssistant {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatForm = document.getElementById('chatForm');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.errorContainer = document.getElementById('errorContainer');
        
        this.initializeEventListeners();
        this.knowledgeBase = this.buildKnowledgeBase();
    }

    initializeEventListeners() {
        this.chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUserMessage();
        });

        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });
    }

    buildKnowledgeBase() {
        return {
            personal: {
                name: "Kevin Denman",
                location: "Based in the United States",
                birth_year: 1988,
                generation: "Millennial",
                social_links: {
                    twitter: "https://twitter.com/kcdenman",
                    telegram: "https://t.me/kevindenman",
                    linkedin: "https://www.linkedin.com/in/kcdenman/",
                    github: "https://github.com/kcdenman",
                    chess: "https://www.chess.com/member/kevincdenman",
                    nounspace: "https://www.nounspace.com/s/basedchad/Profile"
                }
            },
            education: {
                degree: "Bachelor of Science in Industrial Engineering (Systems Engineering)",
                university: "West Virginia University",
                additional_background: "Initially studied Finance for one year before transferring to Engineering, gained understanding of financial markets and credit derivatives"
            },
            bitcoin_crypto: {
                bitcoin_discovery: "First learned about Bitcoin in 2015",
                philosophy: "Bitcoin has more potential than the Internet to fundamentally disrupt human civilization",
                perspective: "Crypto represents his once-in-a-lifetime opportunity to make a real impact, similar to how the Internet was for previous generations",
                expertise: "Deep understanding of both technical and business aspects of cryptocurrency and blockchain technology"
            },
            current_roles: {
                morpheus: {
                    role: "Contributor",
                    company: "Morpheus (mor.org)",
                    focus: "Working on The MOR Builders Accelerator (morbuilders.xyz)",
                    responsibilities: [
                        "Maintainer of Morpheus Accelerator to accelerate Builders",
                        "Facilitating connections across capital, code, compute and community"
                    ]
                },
                the_graph: {
                    role: "Business Development and Partnerships",
                    company: "Edge & Node (edgeandnode.com)",
                    project: "The Graph (thegraph.com)",
                    responsibilities: [
                        "GTM for EVM and non-EVM chain integrations",
                        "GTM for Subgraph Studio and dapp protocol integrations",
                        "BD and Partnerships organizational strategy, operations, and team management"
                    ]
                }
            },
            previous_crypto_roles: {
                cosmos: {
                    role: "Head of Strategy & Growth",
                    company: "Strangelove (strange.love)",
                    project: "Cosmos (cosmos.network)",
                    responsibilities: [
                        "GTM for IBC engineering services for Cosmos appchains",
                        "GTM for Cosmos infrastructure services, including RPC, Relayer, and Validator infrastructure",
                        "Strategic support for seed level venture funding in IBC / Cosmos ecosystem",
                        "0 to 1 BD and Partnerships organizational strategy, operations, and team management"
                    ]
                }
            },
            advising: {
                current: ["Katara AI (katara.ai)"]
            },
            pre_crypto_experience: {
                optoro: {
                    role: "Director of Business Development and Integration Architecture",
                    company: "Optoro (optoro.com)",
                    focus: "Enterprise Software in Retail and Supply Chain sector",
                    responsibilities: [
                        "GTM for Enterprise Software in the Retail and Supply Chain sector",
                        "Implementation management for onboarding and integration of the Optoro platform",
                        "Integration Architecture for Fintech, eCommerce, Order Management, Inventory Management, and Warehouse Management systems"
                    ]
                },
                sights_consulting: {
                    role: "Co-Founder",
                    company: "Sights",
                    focus: "Data Analytics platform implementations",
                    responsibilities: [
                        "0 to 1 startup including Business Model Design, Entity Formation, Business Development, Partnerships, Brand Development, Relationship Management, and Solution Implementation",
                        "Data Analytics platform design and implementation using a variety of data visualization, storage, and retrieval technologies"
                    ]
                },
                deloitte: {
                    role: "Technology Consultant",
                    company: "Deloitte Consulting",
                    focus: "Technology implementations for Fortune 500 companies",
                    responsibilities: [
                        "Implemented Custom Software, Enterprise Software, and Data Analytics technologies",
                        "Developed technology partnerships with Salesforce, Mulesoft, and Tableau",
                        "Technical Business Development and Implementation for Fortune 500 companies across several industries",
                        "Founding member of Deloitte's Visualization Studio which combined designers, data scientists, developers to deliver state of the art data analytics solutions"
                    ]
                }
            },
            skills_expertise: {
                technical: [
                    "Systems Engineering",
                    "Integration Architecture",
                    "Data Analytics",
                    "Blockchain Technology",
                    "Enterprise Software Implementation"
                ],
                business: [
                    "Business Development",
                    "Partnerships",
                    "Go-to-Market Strategy",
                    "Operations Management",
                    "Strategic Planning",
                    "Team Management"
                ],
                industries: [
                    "Cryptocurrency/Blockchain",
                    "DeFi/Web3",
                    "Enterprise Software",
                    "Retail and Supply Chain",
                    "Financial Technology"
                ]
            },
            charitable_work: {
                mustard_seed_ranch: {
                    url: "https://mustardseedranch.org/",
                    description: "Foundation providing traumatized youth a safe environment for healing"
                }
            },
            unique_value_proposition: "Technical background in designing and implementing technology systems combined with business development skills",
            career_philosophy: "Focus on early stage startups in the web3 space, working on strategy, business development, partnerships and operations"
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
                return "Kevin has a strong belief that Bitcoin and cryptocurrency represent the most significant technological advancement since the Internet. He sees crypto as having more potential than the Internet to fundamentally disrupt human civilization. His perspective is shaped by missing the opportunity to help build the Internet as a millennial, making crypto his generation's defining technological opportunity.";
            }
            return "Kevin has been deeply involved in the crypto space since 2015. He currently works with The Graph and Morpheus, and previously held key roles at Cosmos/Strangelove. His expertise spans business development, partnerships, and go-to-market strategies for blockchain projects across EVM and non-EVM chains.";
        }

        // Current work questions
        if (message.includes('current') || message.includes('now') || message.includes('today') || message.includes('working')) {
            return "Kevin is currently working on multiple crypto projects: He's a contributor to Morpheus, working on The MOR Builders Accelerator, and also works in Business Development and Partnerships at Edge & Node on The Graph protocol. At Morpheus, he maintains the accelerator to help builders and facilitates connections across capital, code, compute, and community. At The Graph, he focuses on GTM for chain integrations and protocol partnerships.";
        }

        // Experience/background questions
        if (message.includes('experience') || message.includes('background') || message.includes('career') || message.includes('work')) {
            return "Kevin has a diverse background spanning both traditional tech and crypto. He has a Systems Engineering degree from West Virginia University. Before crypto, he worked at Deloitte Consulting as a Technology Consultant, co-founded Sights (a data analytics startup), and was Director of Business Development at Optoro. In crypto, he's held leadership roles at Cosmos/Strangelove, The Graph, and Morpheus, focusing on business development, partnerships, and go-to-market strategies.";
        }

        // Education questions
        if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('study')) {
            return "Kevin has a Bachelor of Science degree in Industrial Engineering (also known as Systems Engineering) from West Virginia University. Interestingly, he initially spent a year as a Finance major learning about financial markets, including differential equations applied to credit default swaps, before transferring to Engineering. Today, he draws from both his Engineering and Finance experience in the crypto space.";
        }

        // Skills questions
        if (message.includes('skill') || message.includes('expertise') || message.includes('good at') || message.includes('specialize')) {
            return "Kevin's unique superpower is combining his technical background in designing and implementing technology systems with his business development skills. His technical expertise includes systems engineering, integration architecture, and blockchain technology. On the business side, he excels at business development, partnerships, go-to-market strategy, and operations management across industries like crypto/blockchain, enterprise software, and fintech.";
        }

        // Company-specific questions
        if (message.includes('morpheus') || message.includes('mor')) {
            return "At Morpheus (mor.org), Kevin is a contributor working on The MOR Builders Accelerator (morbuilders.xyz). He maintains the Morpheus Accelerator to accelerate builders and facilitates connections across capital, code, compute, and community. Morpheus is focused on decentralized AI infrastructure.";
        }

        if (message.includes('graph') || message.includes('edge') || message.includes('node')) {
            return "Kevin works in Business Development and Partnerships at Edge & Node, the company behind The Graph protocol (thegraph.com). His responsibilities include go-to-market strategies for EVM and non-EVM chain integrations, GTM for Subgraph Studio and dapp protocol integrations, and overall BD and partnerships organizational strategy and team management.";
        }

        if (message.includes('cosmos') || message.includes('strangelove')) {
            return "Kevin previously served as Head of Strategy & Growth at Strangelove (strange.love), working on Cosmos (cosmos.network). He handled GTM for IBC engineering services for Cosmos appchains, GTM for Cosmos infrastructure services (RPC, Relayer, and Validator infrastructure), provided strategic support for seed-level venture funding in the IBC/Cosmos ecosystem, and built the BD and partnerships organization from 0 to 1.";
        }

        // Contact/social questions
        if (message.includes('contact') || message.includes('reach') || message.includes('social') || message.includes('twitter') || message.includes('linkedin')) {
            return "You can reach Kevin through several channels: Twitter/X (@kcdenman), Telegram (@kevindenman), LinkedIn (/in/kcdenman/), GitHub (kcdenman), or even challenge him to a game of chess on Chess.com (kevincdenman). He's also active on Nounspace at /s/basedchad/Profile.";
        }

        // Location questions
        if (message.includes('where') || message.includes('location') || message.includes('live') || message.includes('based')) {
            return "Kevin is based in the United States. You can find more specific contact information through his social media channels.";
        }

        // Charity questions
        if (message.includes('charity') || message.includes('foundation') || message.includes('mustard') || message.includes('ranch')) {
            return "Kevin supports Mustard Seed Ranch (mustardseedranch.org), a foundation that provides traumatized youth a safe environment for healing. He encourages others to learn more about how they can help support this important cause.";
        }

        // Advising questions
        if (message.includes('advising') || message.includes('advisor') || message.includes('katara')) {
            return "Kevin currently serves as an advisor to Katara AI (katara.ai), applying his expertise in business development and crypto to help guide emerging AI projects.";
        }

        // General greeting or unclear questions
        if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.length < 20) {
            return "Hi! I'm Kevin's AI assistant. I can help you learn about Kevin's background in crypto, business development, systems engineering, and his various projects. Feel free to ask about his current work at Morpheus and The Graph, his previous experience at companies like Cosmos/Strangelove, Optoro, and Deloitte, or his educational background and expertise. What would you like to know?";
        }

        // Default response for unmatched questions
        return "I'd be happy to help you learn more about Kevin! You can ask me about his background in crypto (Bitcoin, The Graph, Morpheus, Cosmos), his business development experience, his systems engineering education, his previous roles at companies like Deloitte and Optoro, or how to contact him. What specific aspect of Kevin's background interests you most?";
    }

    async handleUserMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Disable input while processing
        this.chatInput.disabled = true;
        this.sendButton.disabled = true;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        try {
            // Simulate API delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
            
            const response = this.generateResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideTypingIndicator();
            this.showError('Sorry, I encountered an error. Please try again.');
            console.error('Chat error:', error);
        } finally {
            // Re-enable input
            this.chatInput.disabled = false;
            this.sendButton.disabled = false;
            this.chatInput.focus();
        }
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'block';
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        this.errorContainer.appendChild(errorDiv);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
}

// Widget functionality for embedding in other pages
class ChatWidget {
    constructor() {
        this.isEmbedded = window.self !== window.top || document.querySelector('.chat-widget');
        if (this.isEmbedded) {
            this.createWidget();
        }
    }

    createWidget() {
        // Create toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'widget-toggle';
        toggleButton.innerHTML = '💬';
        toggleButton.setAttribute('aria-label', 'Open chat');
        
        // Create widget container
        const widget = document.createElement('div');
        widget.className = 'chat-widget';
        widget.innerHTML = `
            <div class="chat-header">
                <h3 style="margin: 0; font-size: 1.2rem;">🤖 Ask about Kevin</h3>
                <button id="closeWidget" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">&times;</button>
            </div>
            <div class="chat-messages" id="widgetMessages" style="flex: 1; overflow-y: auto; padding: 1rem; background: #f8f9fa;">
                <div class="message assistant">
                    <div class="message-content">
                        👋 Hi! I'm Kevin's AI assistant. What would you like to know about his background or experience?
                    </div>
                </div>
            </div>
            <div class="typing-indicator" id="widgetTyping" style="display: none; padding: 0.75rem 1rem; background: #e3f2fd; margin: 0 1rem; border-radius: 18px;">
                <span class="typing-dots">Typing...</span>
            </div>
            <div class="chat-input-container">
                <form class="chat-input-form" id="widgetForm">
                    <input type="text" id="widgetInput" class="chat-input" placeholder="Ask about Kevin..." autocomplete="off">
                    <button type="submit" class="send-button">💬</button>
                </form>
            </div>
        `;

        document.body.appendChild(toggleButton);
        document.body.appendChild(widget);

        // Event listeners
        toggleButton.addEventListener('click', () => {
            widget.classList.toggle('open');
            toggleButton.style.display = widget.classList.contains('open') ? 'none' : 'flex';
        });

        widget.querySelector('#closeWidget').addEventListener('click', () => {
            widget.classList.remove('open');
            toggleButton.style.display = 'flex';
        });

        // Initialize chat for widget
        new ChatAssistant();
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('chatMessages')) {
        // Full chat page
        new ChatAssistant();
    } else {
        // Widget mode
        new ChatWidget();
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ChatAssistant, ChatWidget };
} 