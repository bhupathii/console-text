import { ConsoleTextClient } from './client';
import { ConsoleTextConfig, SeverityLevel } from './types';

// Type declarations for global environments
declare const globalThis: any;
declare const window: any;
declare const global: any;

// Global instance
let globalClient: ConsoleTextClient | null = null;

/**
 * Configure Console.text globally
 */
export function configure(config: ConsoleTextConfig): void {
  globalClient = new ConsoleTextClient(config);
  
  // Attach to global console object for convenience
  try {
    if (typeof globalThis !== 'undefined' && globalThis.console) {
      globalThis.console.text = text;
    } else if (typeof window !== 'undefined' && window.console) {
      window.console.text = text;
    } else if (typeof global !== 'undefined' && global.console) {
      global.console.text = text;
    }
  } catch (e) {
    // Silently fail if we can't attach to global console
  }
}

/**
 * Main Console.text function - send message to Telegram
 */
export function text(
  message: string,
  severity: SeverityLevel = 'info',
  metadata?: Record<string, any>
): Promise<boolean> {
  if (!globalClient) {
    console.warn('Console.text not configured. Call configure() first.');
    return Promise.resolve(false);
  }
  
  return globalClient.send(message, severity, metadata);
}

/**
 * Send critical error message
 */
export function critical(message: string, metadata?: Record<string, any>): Promise<boolean> {
  return text(message, 'critical', metadata);
}

/**
 * Send error message
 */
export function error(message: string, metadata?: Record<string, any>): Promise<boolean> {
  return text(message, 'error', metadata);
}

/**
 * Send warning message
 */
export function warning(message: string, metadata?: Record<string, any>): Promise<boolean> {
  return text(message, 'warning', metadata);
}

/**
 * Send info message
 */
export function info(message: string, metadata?: Record<string, any>): Promise<boolean> {
  return text(message, 'info', metadata);
}

/**
 * Get current status
 */
export function getStatus() {
  if (!globalClient) {
    return null;
  }
  return globalClient.getStatus();
}

/**
 * Update configuration
 */
export function updateConfig(config: Partial<ConsoleTextConfig>): void {
  if (!globalClient) {
    console.warn('Console.text not configured. Call configure() first.');
    return;
  }
  globalClient.updateConfig(config);
}

/**
 * Clear message queue
 */
export function clearQueue(): void {
  if (!globalClient) {
    return;
  }
  globalClient.clearQueue();
}

// Re-export types and classes
export { ConsoleTextClient } from './client';
export { TokenBucketRateLimiter } from './rate-limiter';
export * from './types';

// Default export for convenience
export default {
  configure,
  text,
  critical,
  error,
  warning,
  info,
  getStatus,
  updateConfig,
  clearQueue
}; 