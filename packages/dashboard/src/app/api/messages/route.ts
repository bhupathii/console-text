import { NextRequest, NextResponse } from 'next/server';

// Check if required environment variables are available
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

// Types
interface ConsoleTextMessage {
  message: string;
  severity?: 'info' | 'warning' | 'error' | 'critical';
  metadata?: Record<string, any>;
  timestamp?: number;
  projectId?: string;
  environment?: string;
}

interface Project {
  id: string;
  user_id: string;
  name: string;
  api_key: string;
  telegram_bot_token: string;
  telegram_chat_id: string;
  telegram_configured: boolean;
  rate_limit_per_minute: number;
  enabled: boolean;
}

async function checkRateLimit(projectId: string, limitPerMinute: number): Promise<boolean> {
  // For now, return true. In production, implement proper rate limiting
  return true;
}

async function storeMessage(message: ConsoleTextMessage, projectId: string): Promise<string> {
  // Generate a simple message ID for now
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function sendTelegramNotification(message: ConsoleTextMessage, project: any): Promise<void> {
  // Placeholder for Telegram integration
  console.log(`Would send Telegram notification: ${message.message}`);
}

export async function POST(req: NextRequest) {
  // Return error if environment variables are missing
  if (missingVars.length > 0) {
    return NextResponse.json({ 
      error: 'Service not configured', 
      missing: missingVars,
      message: 'Required environment variables are not set. Please configure your database connection.'
    }, { status: 503 });
  }

  try {
    console.log('🚀 Processing console.text message...');
    
    // Verify API key
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('❌ Missing or invalid authorization header');
      return NextResponse.json({ error: 'Missing or invalid API key' }, { status: 401 });
    }

    const apiKey = authHeader.substring(7);
    console.log(`🔑 API Key: ${apiKey}`);
    
    // Dynamically import Supabase only when env vars are available
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // Verify API key exists and get project info
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*')
      .eq('api_key', apiKey)
      .eq('enabled', true)
      .single();

    if (projectError || !project) {
      console.error('❌ Project error:', projectError?.message || 'Project not found');
      return NextResponse.json({ error: 'Invalid API key or project disabled' }, { status: 401 });
    }

    console.log(`✅ Project found: ${project.name} (User: ${project.user_id})`);

    // Parse message
    const body: ConsoleTextMessage = await req.json();
    console.log(`📝 Message: ${body.message} (${body.severity || 'info'})`);
    
    if (!body.message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check rate limiting
    const rateLimitOk = await checkRateLimit(project.id, project.rate_limit_per_minute);
    if (!rateLimitOk) {
      console.log('⚠️ Rate limit exceeded');
      return NextResponse.json({ 
        error: 'Rate limit exceeded',
        rateLimitInfo: {
          remaining: 0,
          resetTime: Date.now() + 60000
        }
      }, { status: 429 });
    }

    // Store message in database first
    const messageId = await storeMessage(body, project.id);
    console.log(`💾 Message stored with ID: ${messageId}`);

    // Send Telegram notification if configured
    if (project.telegram_configured && project.telegram_chat_id) {
      await sendTelegramNotification(body, project);
    }

    return NextResponse.json({
      success: true,
      messageId,
      message: 'Message processed successfully'
    });

  } catch (error) {
    console.error('❌ Message processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 