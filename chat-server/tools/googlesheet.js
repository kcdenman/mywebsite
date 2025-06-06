const axios = require('axios');

class GoogleSheetTool {
    constructor() {
        this.webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    }

    async createLead(leadData) {
        try {
            const payload = {
                timestamp: new Date().toISOString(),
                firstName: leadData.firstName,
                lastName: leadData.lastName,
                email: leadData.email,
                company: leadData.company,
                message: leadData.message
            };

            const response = await axios.post(this.webhookUrl, payload);
            
            return {
                success: true,
                message: 'Lead added to Google Sheet successfully'
            };
        } catch (error) {
            console.error('Error adding lead to Google Sheet:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = new GoogleSheetTool(); 