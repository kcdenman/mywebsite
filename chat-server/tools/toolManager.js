const googleSheetTool = require('./googlesheet');
const inboundLeadSpecialist = require('./inboundLeadSpecialist');

class ToolManager {
    constructor() {
        this.tools = {
            'create_lead': this.createLead.bind(this),
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

    async createLead(parameters) {
        return await googleSheetTool.createLead(parameters);
    }

    async handleInboundLead(parameters) {
        return await inboundLeadSpecialist.handleConversation(parameters.message, parameters.history);
    }
}

module.exports = new ToolManager(); 