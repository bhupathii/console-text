#!/usr/bin/env node

/**
 * Test Script for Console.text Client Library
 *
 * This script tests the console.text functionality by sending various
 * types of messages to your Telegram bot via the API.
 *
 * Usage: node test-console-text.js
 */

// We'll simulate the console.text client library since it's not built yet
// In a real scenario, you'd do: const { configure, text, critical, error, warning, info } = require('console.text');

const axios = require("axios");

// Configuration - you'll need to get this API key from your database after running the SQL scripts
const CONFIG = {
  apiKey: "ct_92fd44bef90dd9bafa24509c37c2d70f", // Replace with actual API key from your database
  apiEndpoint: "http://localhost:3000/api/messages",
  projectId: "console-text-test",
  environment: "development",
};

// Simple console.text client implementation for testing
class ConsoleTextClient {
  constructor(config) {
    this.config = config;
    this.httpClient = axios.create({
      baseURL: config.apiEndpoint,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "console.text-test/1.0.0",
      },
    });
  }

  async send(message, severity = "info", metadata = {}) {
    try {
      console.log(`📤 Sending ${severity.toUpperCase()}: ${message}`);

      const response = await this.httpClient.post("", {
        message,
        severity,
        metadata,
        timestamp: Date.now(),
        projectId: this.config.projectId,
        environment: this.config.environment,
      });

      console.log(`✅ Success! Message ID: ${response.data.messageId}`);
      return true;
    } catch (error) {
      console.error(
        `❌ Failed to send message:`,
        error.response?.data || error.message
      );
      return false;
    }
  }

  async critical(message, metadata = {}) {
    return this.send(message, "critical", metadata);
  }

  async error(message, metadata = {}) {
    return this.send(message, "error", metadata);
  }

  async warning(message, metadata = {}) {
    return this.send(message, "warning", metadata);
  }

  async info(message, metadata = {}) {
    return this.send(message, "info", metadata);
  }
}

// Initialize client
const consoleText = new ConsoleTextClient(CONFIG);

// Test scenarios
async function runTests() {
  console.log("🚀 Starting Console.text Test Suite\n");
  console.log(`📡 API Endpoint: ${CONFIG.apiEndpoint}`);
  console.log(`🔑 API Key: ${CONFIG.apiKey}`);
  console.log(`📁 Project: ${CONFIG.projectId}`);
  console.log(`🌍 Environment: ${CONFIG.environment}\n`);

  // Wait between tests
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    // Test 1: Basic info message
    console.log("🧪 Test 1: Basic Info Message");
    await consoleText.info("Console.text test suite started successfully!");
    await delay(1000);

    // Test 2: Warning with metadata
    console.log("\n🧪 Test 2: Warning with Metadata");
    await consoleText.warning("High memory usage detected", {
      memoryUsage: "85%",
      threshold: "80%",
      server: "test-server-1",
      timestamp: new Date().toISOString(),
    });
    await delay(1000);

    // Test 3: Error message
    console.log("\n🧪 Test 3: Error Message");
    await consoleText.error("Database connection timeout", {
      database: "primary-db",
      connectionAttempts: 3,
      lastError: "Connection timeout after 30 seconds",
    });
    await delay(1000);

    // Test 4: Critical alert
    console.log("\n🧪 Test 4: Critical Alert");
    await consoleText.critical("Payment gateway is down!", {
      gateway: "stripe",
      affectedUsers: 150,
      estimatedRevenueLoss: "$5,000",
      incidentStartTime: new Date().toISOString(),
    });
    await delay(1000);

    // Test 5: Complex metadata
    console.log("\n🧪 Test 5: Complex Metadata");
    await consoleText.error("API endpoint failure", {
      endpoint: "/api/users",
      method: "POST",
      statusCode: 500,
      requestId: "req_123456789",
      userAgent: "Mozilla/5.0 (Test Browser)",
      errorStack: "TypeError: Cannot read property of undefined\n  at line 42",
      requestBody: {
        email: "test@example.com",
        action: "create_user",
      },
      headers: {
        "content-type": "application/json",
        "x-api-version": "v1",
      },
    });
    await delay(1000);

    // Test 6: Rate limiting test (send multiple messages quickly)
    console.log("\n🧪 Test 6: Rate Limiting Test (3 quick messages)");
    for (let i = 1; i <= 3; i++) {
      await consoleText.info(`Rate limit test message ${i}/3`, {
        messageNumber: i,
      });
      await delay(100); // Very short delay to test rate limiting
    }

    console.log("\n✅ All tests completed!");
    console.log("\n📱 Check your Telegram group for the messages!");
    console.log(
      "📊 Check your dashboard at http://localhost:3000 for message history"
    );
  } catch (error) {
    console.error("\n❌ Test suite failed:", error.message);
  }
}

// Function to get API key from database (helper)
function getApiKeyInstructions() {
  console.log("\n📋 To get your API key:");
  console.log("1. Go to your Supabase project dashboard");
  console.log("2. Navigate to the SQL Editor");
  console.log("3. Run this query: SELECT api_key FROM projects LIMIT 1;");
  console.log(
    '4. Copy the API key and replace "ct_your_api_key_here" in this script'
  );
  console.log("5. Make sure you've run the database setup scripts first!\n");
}

// Main execution
if (require.main === module) {
  if (CONFIG.apiKey === "ct_your_api_key_here") {
    console.log("⚠️  Please configure your API key first!");
    getApiKeyInstructions();
    process.exit(1);
  }

  runTests().catch((error) => {
    console.error("💥 Unexpected error:", error);
    process.exit(1);
  });
}

module.exports = { ConsoleTextClient };
