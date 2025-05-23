import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

export async function POST(req: NextRequest) {
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

    // Format message for Telegram
    const telegramMessage = formatTelegramMessage(body, project);

    // Send to Telegram (only if configured)
    let telegramSuccess = false;
    if (project.telegram_configured && project.telegram_bot_token && project.telegram_chat_id) {
      console.log(`📤 Sending to Telegram...`);
      telegramSuccess = await sendTelegramMessage(
        project.telegram_bot_token,
        project.telegram_chat_id,
        telegramMessage
      );
      
      if (telegramSuccess) {
        console.log('✅ Telegram message sent successfully');
      } else {
        console.log('⚠️ Failed to send Telegram message, but continuing...');
      }
    } else {
      console.log('⚠️ Telegram not configured, skipping...');
    }

    // Update message with telegram status
    await supabase
      .from('messages')
      .update({ telegram_sent: telegramSuccess })
      .eq('id', messageId);

    return NextResponse.json({
      success: true,
      messageId,
      telegramSent: telegramSuccess,
      rateLimitInfo: {
        remaining: project.rate_limit_per_minute - 1,
        resetTime: Date.now() + 60000
      }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : 'No stack trace';
    console.error('💥 API Error:', errorMessage);
    console.error('Stack:', errorStack);
    
    // Log the full error object for debugging
    console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: errorMessage,
      stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
    }, { status: 500 });
  }
}

async function checkRateLimit(projectId: string, limitPerMinute: number): Promise<boolean> {
  try {
    const oneMinuteAgo = new Date(Date.now() - 60000);
    
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('project_id', projectId)
      .gte('created_at', oneMinuteAgo.toISOString());

    if (error) {
      console.error('Rate limit check error:', error);
      return false;
    }

    return (count || 0) < limitPerMinute;
  } catch (error) {
    console.error('Rate limit check exception:', error);
    return false;
  }
}

function formatTelegramMessage(message: ConsoleTextMessage, project: Project): string {
  const severityEmojis = {
    critical: '🚨',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };

  const emoji = severityEmojis[message.severity || 'info'];
  const timestamp = new Date(message.timestamp || Date.now()).toISOString();
  
  let formattedMessage = `${emoji} **[${(message.severity || 'info').toUpperCase()}]** Console.text Alert\n\n`;
  formattedMessage += `**Project:** ${project.name}\n`;
  formattedMessage += `**Environment:** ${message.environment || 'Unknown'}\n`;
  formattedMessage += `**Time:** ${timestamp}\n\n`;
  formattedMessage += `**Message:** ${message.message}\n`;

  if (message.metadata && Object.keys(message.metadata).length > 0) {
    formattedMessage += `\n**Metadata:**\n\`\`\`json\n${JSON.stringify(message.metadata, null, 2)}\n\`\`\``;
  }

  return formattedMessage;
}

async function sendTelegramMessage(botToken: string, chatId: string, message: string): Promise<boolean> {
  try {
    console.log(`📡 Sending to Telegram bot ${botToken.substring(0, 10)}... to chat ${chatId}`);
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Telegram API error:', data);
      return false;
    }
    
    console.log('✅ Telegram response:', data.ok ? 'Success' : 'Failed');
    return data.ok;
  } catch (error) {
    console.error('Telegram API exception:', error);
    return false;
  }
}

async function storeMessage(message: ConsoleTextMessage, projectId: string): Promise<string> {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        project_id: projectId,
        message: message.message,
        severity: message.severity || 'info',
        metadata: message.metadata || {},
        environment: message.environment || 'unknown',
        telegram_sent: false,
        created_at: new Date(message.timestamp || Date.now()).toISOString()
      })
      .select('id')
      .single();

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    return data.id;
  } catch (error) {
    console.error('Store message exception:', error);
    throw error;
  }
} 