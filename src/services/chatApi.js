/**
 * Client service to query the support chatbot endpoint.
 * @param {string} message - The message typed by the user.
 * @param {Array} history - Array of previous messages in formatting { role: 'user'|'assistant', content: '...' }.
 * @returns {Promise<Object>} Object containing { success: boolean, reply: string }.
 */
export async function queryChatBot(message, history = []) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (response.status === 429) {
      return {
        success: false,
        reply: 'I’m unable to fully resolve this issue due to high traffic volumes. Please contact support at rg39405057@gmail.com.'
      };
    }

    if (!response.ok) {
      throw new Error('API server returned error status.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Frontend queryChatBot error:', error);
    return {
      success: false,
      reply: 'I’m unable to fully resolve this issue. Please contact support at rg39405057@gmail.com.'
    };
  }
}
