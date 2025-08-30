// Cloudflare Pages Functions Middleware
export async function onRequest(context: any) {
  // Add CORS headers for API routes
  if (context.request.url.includes('/api/')) {
    const response = await context.next();
    
    // Clone the response to modify headers
    const newResponse = new Response(response.body, response);
    
    // Add CORS headers
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return newResponse;
  }
  
  return context.next();
}
