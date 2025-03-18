
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const DISCORD_CLIENT_ID = Deno.env.get('DISCORD_CLIENT_ID') || '';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    let redirectTo = '';
    
    // Get redirect URL from request body
    if (req.method === 'POST') {
      const body = await req.json();
      redirectTo = body.redirectTo || '';
    }
    
    if (!redirectTo) {
      return new Response(
        JSON.stringify({ error: 'No redirect URL provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Create Discord OAuth URL
    const scope = 'identify+guilds';
    const discordUrl = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirectTo)}&scope=${scope}`;
    
    return new Response(
      JSON.stringify({ url: discordUrl }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error generating Discord OAuth URL:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
