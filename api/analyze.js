export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, ticker, email } = req.body || {};

    // 1. Trim and validate input fields
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedTicker = typeof ticker === 'string' ? ticker.trim().toUpperCase() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';

    // Validation checks
    if (!trimmedName || trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: Name must be at least 2 characters long.'
      });
    }

    // Ticker validation regex: alphanumeric, dots, hyphens, up to 10 characters
    const tickerRegex = /^[A-Z0-9.-]{1,10}$/;
    if (!trimmedTicker || !tickerRegex.test(trimmedTicker)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: Ticker must be alphanumeric (1-10 characters).'
      });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: Please provide a valid email address.'
      });
    }

    // 2. Read server environment variables
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nApiKey = process.env.N8N_API_KEY;

    if (!n8nWebhookUrl) {
      console.error('Server Configuration Error: N8N_WEBHOOK_URL is not set.');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact the administrator.'
      });
    }

    // 3. Prepare headers and call the n8n production webhook
    const headers = {
      'Content-Type': 'application/json'
    };

    if (n8nApiKey) {
      headers['x-api-key'] = n8nApiKey;
    }

    // Timeout control using AbortController (45 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    let response;
    try {
      response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: trimmedName,
          ticker: trimmedTicker,
          email: trimmedEmail
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(`n8n API responded with status ${response.status}: ${errorText}`);
      return res.status(502).json({
        success: false,
        message: 'The automated analysis engine failed to complete. Please check the stock ticker and try again.'
      });
    }

    // 4. Validate n8n response format
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const errorText = await response.text().catch(() => '');
      console.error(`n8n webhook returned non-JSON response: ${errorText}`);
      return res.status(502).json({
        success: false,
        message: 'Received an invalid response format from the analysis engine.'
      });
    }

    const responseData = await response.json();
    
    // Normalize n8n response: extract first item if it returned an array
    let parsedData = responseData;
    if (Array.isArray(responseData)) {
      parsedData = responseData[0];
    }

    // Force success to true if payload looks valid but success is missing
    if (parsedData && (parsedData.ticker || parsedData.overall_signal) && parsedData.success === undefined) {
      parsedData.success = true;
    }

    return res.status(200).json(parsedData);

  } catch (error) {
    console.error('API Server Error:', error);
    
    if (error.name === 'AbortError') {
      return res.status(504).json({
        success: false,
        message: 'The analysis request timed out. Please try again later.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'An internal error occurred while processing your request.'
    });
  }
}
