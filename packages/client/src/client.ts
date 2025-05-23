import axios, { AxiosInstance, AxiosError } from 'axios';
import { ConsoleTextConfig, ConsoleTextMessage, QueuedMessage, ApiResponse, SeverityLevel } from './types';
import { TokenBucketRateLimiter } from './rate-limiter';

// Type declaration for Node.js process
declare const process: {
  env: {
    NODE_ENV?: string;
  };
};

export class ConsoleTextClient {
  private config: Required<ConsoleTextConfig>;
  private rateLimiter: TokenBucketRateLimiter;
  private httpClient: AxiosInstance;
  private messageQueue: QueuedMessage[] = [];
  private isProcessingQueue = false;

  constructor(config: ConsoleTextConfig) {
    // Set default configuration
    this.config = {
      apiEndpoint: 'https://api.console-text.dev',
      projectId: 'default',
      environment: (typeof process !== 'undefined' && process.env?.NODE_ENV) || 'development',
      enabled: true,
      rateLimitPerMinute: 60,
      rateLimitPerHour: 1000,
      debug: false,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config
    };

    // Initialize rate limiter
    this.rateLimiter = new TokenBucketRateLimiter(
      this.config.rateLimitPerMinute,
      this.config.rateLimitPerMinute / 60 // tokens per second
    );

    // Setup HTTP client
    this.httpClient = axios.create({
      baseURL: this.config.apiEndpoint,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'console.text-client/1.0.0'
      }
    });

    // Start queue processor
    this.startQueueProcessor();
  }

  /**
   * Main API: Send a message to Telegram
   */
  async send(
    message: string,
    severity: SeverityLevel = 'info',
    metadata?: Record<string, any>
  ): Promise<boolean> {
    if (!this.config.enabled) {
      this.debug('Console.text is disabled');
      return false;
    }

    const messageObj: ConsoleTextMessage = {
      message,
      severity,
      metadata,
      timestamp: Date.now(),
      projectId: this.config.projectId,
      environment: this.config.environment
    };

    // Check rate limiting
    const tokenCost = TokenBucketRateLimiter.getTokenCostBySeverity(severity);
    
    if (!this.rateLimiter.canSend(tokenCost)) {
      this.debug(`Rate limit exceeded for ${severity} message`);
      
      // Queue non-critical messages, send critical immediately
      if (severity === 'critical' || severity === 'error') {
        return await this.sendImmediately(messageObj);
      } else {
        this.queueMessage(messageObj);
        return true; // Queued successfully
      }
    }

    // Consume tokens and send
    if (this.rateLimiter.consume(tokenCost)) {
      return await this.sendImmediately(messageObj);
    }

    // Fallback to queue
    this.queueMessage(messageObj);
    return true;
  }

  /**
   * Send message immediately (bypass queue)
   */
  private async sendImmediately(message: ConsoleTextMessage): Promise<boolean> {
    try {
      const response = await this.httpClient.post<ApiResponse>('/messages', message);
      
      this.debug(`Message sent successfully: ${response.data.messageId}`);
      return response.data.success;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.debug(`Failed to send message: ${errorMessage}`);
      
      // Queue for retry if it's a network error
      if (axios.isAxiosError(error) && !error.response) {
        this.queueMessage(message);
      }
      
      return false;
    }
  }

  /**
   * Add message to queue for later processing
   */
  private queueMessage(message: ConsoleTextMessage): void {
    const queuedMessage: QueuedMessage = {
      ...message,
      id: this.generateId(),
      retryCount: 0,
      scheduledAt: Date.now()
    };

    this.messageQueue.push(queuedMessage);
    this.debug(`Message queued: ${queuedMessage.id}`);
  }

  /**
   * Process queued messages
   */
  private async startQueueProcessor(): Promise<void> {
    setInterval(async () => {
      if (this.isProcessingQueue || this.messageQueue.length === 0) {
        return;
      }

      this.isProcessingQueue = true;

      try {
        while (this.messageQueue.length > 0) {
          const message = this.messageQueue[0];
          
          // Check if we can send this message
          const tokenCost = TokenBucketRateLimiter.getTokenCostBySeverity(message.severity || 'info');
          
          if (!this.rateLimiter.canSend(tokenCost)) {
            break; // Wait for more tokens
          }

          // Remove from queue and try to send
          this.messageQueue.shift();
          
          if (this.rateLimiter.consume(tokenCost)) {
            const success = await this.sendImmediately(message);
            
            if (!success && message.retryCount < this.config.retryAttempts) {
              // Re-queue with increased retry count
              message.retryCount++;
              message.scheduledAt = Date.now() + (this.config.retryDelay * message.retryCount);
              this.messageQueue.push(message);
            }
          }
        }
      } finally {
        this.isProcessingQueue = false;
      }
    }, 5000); // Process queue every 5 seconds
  }

  /**
   * Get queue status and rate limit info
   */
  getStatus() {
    return {
      queueLength: this.messageQueue.length,
      rateLimitStatus: this.rateLimiter.getStatus(),
      isEnabled: this.config.enabled,
      environment: this.config.environment,
      projectId: this.config.projectId
    };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<ConsoleTextConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update HTTP client headers if API key changed
    if (newConfig.apiKey) {
      this.httpClient.defaults.headers['Authorization'] = `Bearer ${newConfig.apiKey}`;
    }
  }

  /**
   * Clear message queue
   */
  clearQueue(): void {
    this.messageQueue = [];
    this.debug('Message queue cleared');
  }

  /**
   * Debug logging
   */
  private debug(message: string): void {
    if (this.config.debug) {
      console.log(`[Console.text] ${message}`);
    }
  }

  /**
   * Generate unique message ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
} 