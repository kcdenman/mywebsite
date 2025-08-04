const inboundLeadSpecialist = require('./inboundLeadSpecialist');

class ToolManager {
    constructor() {
        this.tools = {
            'inbound_lead_specialist': this.handleInboundLead.bind(this)
        };
    }

    async handleToolCall(toolName, parameters) {
        const tool = this.tools[toolName];
        if (!tool) {
            throw new Error(`Tool ${toolName} not found`);
        }
        return await tool(parameters);
    }

    async handleInboundLead(parameters) {
        return await inboundLeadSpecialist.handleConversation(parameters.message, parameters.history);
    }
}

module.exports = new ToolManager(); 