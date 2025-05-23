import { RateLimitState } from './types';

export class TokenBucketRateLimiter {
  private state: RateLimitState;

  constructor(
    capacity: number = 60, // 60 messages per minute by default
    refillRate: number = 1  // 1 token per second
  ) {
    this.state = {
      tokens: capacity,
      lastRefill: Date.now(),
      capacity,
      refillRate
    };
  }

  /**
   * Check if we can send a message (consume a token)
   */
  canSend(tokensRequired: number = 1): boolean {
    this.refillTokens();
    return this.state.tokens >= tokensRequired;
  }

  /**
   * Consume tokens for sending a message
   */
  consume(tokensRequired: number = 1): boolean {
    if (!this.canSend(tokensRequired)) {
      return false;
    }
    
    this.state.tokens -= tokensRequired;
    return true;
  }

  /**
   * Get the time in milliseconds until next token is available
   */
  timeUntilNextToken(): number {
    this.refillTokens();
    
    if (this.state.tokens >= 1) {
      return 0;
    }
    
    // Calculate time until next refill
    const msPerToken = 1000 / this.state.refillRate;
    return Math.ceil(msPerToken);
  }

  /**
   * Get current rate limit status
   */
  getStatus() {
    this.refillTokens();
    return {
      availableTokens: Math.floor(this.state.tokens),
      capacity: this.state.capacity,
      timeUntilNextToken: this.timeUntilNextToken()
    };
  }

  /**
   * Refill tokens based on elapsed time
   */
  private refillTokens(): void {
    const now = Date.now();
    const timePassed = (now - this.state.lastRefill) / 1000; // Convert to seconds
    
    if (timePassed > 0) {
      const tokensToAdd = timePassed * this.state.refillRate;
      this.state.tokens = Math.min(
        this.state.capacity,
        this.state.tokens + tokensToAdd
      );
      this.state.lastRefill = now;
    }
  }

  /**
   * Adjust rate limit based on severity
   */
  static getTokenCostBySeverity(severity: string): number {
    switch (severity) {
      case 'critical': return 1;  // Normal cost for critical
      case 'error': return 1;     // Normal cost for errors
      case 'warning': return 2;   // Higher cost for warnings
      case 'info': return 3;      // Highest cost for info messages
      default: return 1;
    }
  }
} 