export type SeverityLevel = 'info' | 'warning' | 'error' | 'critical';

export interface ConsoleTextMessage {
  message: string;
  severity?: SeverityLevel;
  metadata?: Record<string, any>;
  timestamp?: number;
  projectId?: string;
  environment?: string;
}

export interface ConsoleTextConfig {
  apiKey: string;
  apiEndpoint?: string;
  projectId?: string;
  environment?: string;
  enabled?: boolean;
  rateLimitPerMinute?: number;
  rateLimitPerHour?: number;
  debug?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

export interface RateLimitState {
  tokens: number;
  lastRefill: number;
  capacity: number;
  refillRate: number;
}

export interface ApiResponse {
  success: boolean;
  messageId?: string;
  error?: string;
  rateLimitInfo?: {
    remaining: number;
    resetTime: number;
  };
}

export interface QueuedMessage extends ConsoleTextMessage {
  id: string;
  retryCount: number;
  scheduledAt: number;
} 