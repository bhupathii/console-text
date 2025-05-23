// Express.js Integration Example
// This shows how to integrate Console.text with an Express application

const express = require("express");
const { configure, critical, error, warning, info } = require("console.text");

const app = express();

// Configure Console.text
configure({
  apiKey: process.env.CONSOLE_TEXT_API_KEY,
  projectId: "my-express-app",
  environment: process.env.NODE_ENV || "development",
});

// Middleware for request logging and performance monitoring
app.use((req, res, next) => {
  const startTime = Date.now();

  // Log incoming requests (info level)
  info(`${req.method} ${req.path}`, {
    userAgent: req.get("User-Agent"),
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  // Monitor response time
  res.on("finish", () => {
    const responseTime = Date.now() - startTime;

    // Alert on slow responses
    if (responseTime > 5000) {
      warning(`Slow response: ${responseTime}ms`, {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        responseTime,
      });
    }

    // Alert on error status codes
    if (res.statusCode >= 500) {
      error(`Server error: ${res.statusCode}`, {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        responseTime,
      });
    }
  });

  next();
});

// Global error handler
app.use((err, req, res, next) => {
  // Send critical alert for unhandled errors
  critical(`Unhandled error: ${err.message}`, {
    error: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    timestamp: new Date().toISOString(),
  });

  res.status(500).json({ error: "Internal server error" });
});

// Example route with error handling
app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Simulate database operation
    const user = await getUserFromDatabase(userId);

    if (!user) {
      warning(`User not found: ${userId}`, { userId });
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    // Handle specific errors
    error(`Database error in /api/users/${req.params.id}: ${err.message}`, {
      userId: req.params.id,
      error: err.stack,
    });

    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Example route for order processing
app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;

    // Process payment
    const payment = await processPayment(order);

    if (!payment.success) {
      critical(`Payment failed for order ${order.id}`, {
        orderId: order.id,
        amount: order.amount,
        paymentError: payment.error,
        customerId: order.customerId,
      });

      return res.status(400).json({ error: "Payment failed" });
    }

    // Success notification
    info(`Order processed successfully: ${order.id}`, {
      orderId: order.id,
      amount: order.amount,
      customerId: order.customerId,
    });

    res.json({ success: true, orderId: order.id });
  } catch (err) {
    critical(`Order processing error: ${err.message}`, {
      order: req.body,
      error: err.stack,
    });

    res.status(500).json({ error: "Order processing failed" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Simulate some helper functions
async function getUserFromDatabase(userId) {
  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

  // Simulate occasional database errors
  if (Math.random() < 0.1) {
    throw new Error("Database connection timeout");
  }

  // Return mock user or null
  return userId === "123" ? { id: userId, name: "John Doe" } : null;
}

async function processPayment(order) {
  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));

  // Simulate payment failures
  if (Math.random() < 0.15) {
    return { success: false, error: "Insufficient funds" };
  }

  return { success: true, transactionId: "txn_" + Date.now() };
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  info(`Server started on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV,
    nodeVersion: process.version,
  });
});

// Graceful shutdown handling
process.on("SIGTERM", () => {
  warning("Server shutting down (SIGTERM)", {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
  });

  process.exit(0);
});

process.on("uncaughtException", (err) => {
  critical(`Uncaught exception: ${err.message}`, {
    error: err.stack,
    uptime: process.uptime(),
  });

  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  critical(`Unhandled promise rejection: ${reason}`, {
    promise: promise.toString(),
    uptime: process.uptime(),
  });
});
