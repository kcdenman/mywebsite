const hubspot = require('@hubspot/api-client');

class HubSpotTool {
    constructor() {
        this.hubspotClient = new hubspot.Client({ 
            accessToken: process.env.HUBSPOT_ACCESS_TOKEN 
        });
    }

    async createLead(leadData) {
        try {
            const properties = {
                email: leadData.email,
                firstname: leadData.firstName,
                lastname: leadData.lastName,
                company: leadData.company,
                message: leadData.message,
                lead_source: 'Website Chat',
                lifecyclestage: 'lead'
            };

            const result = await this.hubspotClient.crm.contacts.basicApi.create({ properties });
            
            // Create a meeting link task
            await this.hubspotClient.crm.tasks.basicApi.create({
                properties: {
                    hs_task_subject: 'Schedule Meeting with ' + leadData.firstName,
                    hs_task_body: `New lead from website chat.\nMessage: ${leadData.message}\nCalendar Link: https://calendar.google.com/calendar/appointments/schedules/AcZssZ03pY9dICaTEtZPh5JqyR6PxzQcfilf3_NyrIw-BRstt_wLhpHCrbRbcixfDHoVmbEjAgnwoLJc`,
                    hs_task_priority: 'HIGH',
                    hs_task_status: 'NOT_STARTED',
                    hs_timestamp: Date.now(),
                }
            });

            return {
                success: true,
                contactId: result.id,
                message: 'Lead created successfully'
            };
        } catch (error) {
            console.error('Error creating lead in HubSpot:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = new HubSpotTool(); 