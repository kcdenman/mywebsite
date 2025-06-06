const googleSheetTool = require('./googlesheet');

class InboundLeadSpecialist {
    constructor() {
        this.systemPrompt = `You are an Inbound Lead Specialist for Kevin Denman. Your sole purpose is to collect lead information and create a record of potential meetings.

IMPORTANT: Your task is to:
1. For the FIRST interaction, ALWAYS respond with EXACTLY:
   "I'd be happy to help you schedule a meeting with Kevin. Could you please provide:
   - Your email address
   - Your first name
   - Your last name
   - Your company name"

2. For subsequent messages:
   - If information is missing, politely ask for the specific missing items
   - Once all information is collected, create the lead record
   - Only after successfully recording the information, provide the calendar link

Be professional, concise, and friendly. DO NOT provide the calendar link until you have collected and recorded ALL required information.`;
    }

    async handleConversation(message, history = []) {
        try {
            // First check if we have all required information
            const leadInfo = this.extractLeadInfo([...history, { role: 'user', content: message }]);
            
            if (leadInfo.isComplete) {
                // Create lead in Google Sheets
                const result = await googleSheetTool.createLead(leadInfo.data);
                if (result.success) {
                    return {
                        success: true,
                        message: "Perfect! I've recorded your information. Here's Kevin's calendar link to schedule the meeting: [Book a Meeting](https://calendar.google.com/calendar/appointments/schedules/AcZssZ03pY9dICaTEtZPh5JqyR6PxzQcfilf3_NyrIw-BRstt_wLhpHCrbRbcixfDHoVmbEjAgnwoLJc?gv=true){:target='_blank'}"
                    };
                }
            }

            // If we don't have complete information, proceed with Venice API call
            console.log('Sending request to Venice API:', {
                message,
                history: JSON.stringify(history)
            });

            const response = await fetch('https://api.venice.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.VENICE_API_KEY}`
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b",
                    messages: [
                        {
                            role: "system",
                            content: this.systemPrompt
                        },
                        ...history,
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    max_tokens: 350,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Venice API error details:', {
                    status: response.status,
                    statusText: response.statusText,
                    body: errorText
                });
                throw new Error(`Venice API error: ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;

            return {
                success: true,
                message: assistantMessage,
                requiresMoreInfo: true
            };

        } catch (error) {
            console.error('InboundLeadSpecialist error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    extractLeadInfo(history) {
        // Initialize lead data
        const leadData = {
            email: null,
            firstName: null,
            lastName: null,
            company: null,
            message: history[0]?.content || "Interested in meeting"
        };

        // Simple regex patterns for extraction
        const patterns = {
            email: /[\w.-]+@[\w.-]+\.\w+/,
            firstName: /(?:first[\s-_]*name:?\s*|^|\s+)([A-Za-z]+)(?:\s|$)/i,
            lastName: /(?:last[\s-_]*name:?\s*|^|\s+)([A-Za-z]+)(?:\s|$)/i,
            company: /(?:company:?\s*|^|\s+)([A-Za-z0-9\s]+)(?:\s|$)/i
        };

        // Search through history for information
        for (const msg of history) {
            const content = msg.content;
            console.log('Checking message content:', content);
            
            if (!leadData.email && patterns.email.test(content)) {
                leadData.email = content.match(patterns.email)[0];
                console.log('Found email:', leadData.email);
            }
            if (!leadData.firstName && patterns.firstName.test(content)) {
                const match = content.match(patterns.firstName);
                leadData.firstName = match[1];
                console.log('Found first name:', leadData.firstName);
            }
            if (!leadData.lastName && patterns.lastName.test(content)) {
                const match = content.match(patterns.lastName);
                leadData.lastName = match[1];
                console.log('Found last name:', leadData.lastName);
            }
            if (!leadData.company && patterns.company.test(content)) {
                const match = content.match(patterns.company);
                leadData.company = match[1].trim();
                console.log('Found company:', leadData.company);
            }
        }

        // Check if all required fields are present
        const isComplete = Boolean(
            leadData.email &&
            leadData.firstName &&
            leadData.lastName &&
            leadData.company
        );

        console.log('Lead info complete:', isComplete, leadData);

        return {
            isComplete,
            data: leadData
        };
    }
}

module.exports = new InboundLeadSpecialist(); 