# Deployment Configuration

## Vercel Environment Variables

The following environment variables need to be configured in the Vercel dashboard:

### Required Variables

1. **VENICE_API_KEY**
   - Description: API key for Venice AI service
   - Used by: `/api/chat.js` and `/tools/inboundLeadSpecialist.js`
   - Source: Copy from Render's environment variables
   - How to set: Vercel Dashboard → Project Settings → Environment Variables

### Optional Variables

2. **GOOGLE_SHEET_WEBHOOK_URL**
   - Description: Webhook URL for Google Sheets integration to collect lead information
   - Used by: `/tools/googlesheet.js`
   - Source: Google Sheets webhook configuration
   - Note: Currently not configured in Render, but will be needed if/when lead collection is activated
   - How to set: Vercel Dashboard → Project Settings → Environment Variables

## Deployment Steps

1. Ensure all code changes are committed to the main branch
2. Vercel will automatically deploy on push to main
3. After deployment, verify:
   - Chat widget loads on production site (www.kevindenman.xyz)
   - Chat API endpoint responds correctly at `/api/chat`
   - Configuration endpoint responds at `/api/config`

## Testing

To test the chat functionality:
1. Visit https://www.kevindenman.xyz/portfolio.html
2. Click on the chat widget
3. Send a test message
4. Verify the AI responds correctly

## Migration from Render

Once Vercel deployment is verified and working:
1. Navigate to Render dashboard
2. Delete the `mywebsite-chat-server` service
3. This will stop billing for the Render service

## API Endpoints

- **POST /api/chat**: Main chat endpoint for AI conversations
- **GET /api/config**: Returns API configuration (API URL)

## Vercel Configuration

The `vercel.json` file at the root level configures:
- Serverless function handlers for API routes
- Route mappings for `/api/chat` and `/api/config`
- Node.js runtime version (20.x)

