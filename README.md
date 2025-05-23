# Console.text 🚨

**Real-time Telegram alerts for developers - Because critical errors shouldn't wait for email.**

Console.text is a developer tool that enhances standard logging by enabling **real-time Telegram alerts** for critical errors in early-stage startups. Simply add `console.text("Error message")` to your code and get instant notifications to your Telegram group.

![Console.text Dashboard](https://via.placeholder.com/800x400/667eea/ffffff?text=Console.text+Dashboard)

## ✨ Features

- **🚀 Ultra Simple API**: Just `console.text("message")` - that's it!
- **⚡ Real-time Alerts**: Instant Telegram notifications via bot
- **🛡️ Smart Rate Limiting**: Prevents spam with token bucket algorithm
- **📊 Beautiful Dashboard**: Monitor message history and analytics
- **🌍 Global Edge Delivery**: Low latency worldwide with serverless architecture
- **💰 Startup Friendly**: Cost-effective pay-per-use pricing
- **🔧 Zero Setup Complexity**: No complex monitoring infrastructure needed

## 🚀 Quick Start

### 1. Install the Package

```bash
npm install console.text
```

### 2. Configure Once

```javascript
import { configure } from "console.text";

configure({
  apiKey: "your-api-key-here",
});
```

### 3. Send Alerts

```javascript
// Simple usage
console.text("Database connection failed!");

// With severity levels
import { critical, error, warning, info } from "console.text";

critical("Payment processing down!");
error("User authentication failed");
warning("API rate limit approaching");
info("New user registered");

// With metadata
console.text("Order processing failed", "error", {
  orderId: "12345",
  userId: "user_abc",
  amount: 99.99,
});
```

## 📱 Telegram Integration

### Set Up Your Bot

1. **Create a Telegram Bot**:

   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Use `/newbot` command
   - Get your bot token

2. **Create a Group/Channel**:

   - Create a Telegram group for your team
   - Add your bot to the group
   - Make the bot an admin

3. **Get Chat ID**:

   - Send a message to your group
   - Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find your chat ID in the response

4. **Configure in Dashboard**:
   - Go to [console-text.dev](https://console-text.dev)
   - Add your bot token and chat ID
   - Test the connection

## 🎯 Use Cases

### Error Monitoring

```javascript
try {
  await processPayment(order);
} catch (error) {
  console.text(`Payment failed: ${error.message}`, "critical", {
    orderId: order.id,
    amount: order.amount,
    error: error.stack,
  });
}
```

### Performance Alerts

```javascript
if (responseTime > 5000) {
  console.text(`Slow API response: ${responseTime}ms`, "warning", {
    endpoint: req.path,
    method: req.method,
    responseTime,
  });
}
```

### Business Events

```javascript
// New user signup
console.text(`New user registered: ${user.email}`, "info", {
  userId: user.id,
  plan: user.plan,
  source: user.signupSource,
});
```

## 📊 Dashboard Features

- **📈 Real-time Analytics**: Message frequency, error rates, response times
- **🔍 Message History**: Searchable and filterable message logs
- **⚙️ Project Management**: Multiple projects and API keys
- **📱 Team Collaboration**: Share alerts with your team
- **🚦 Rate Limit Control**: Customize limits per project
- **📋 API Documentation**: Interactive API explorer

## 🛡️ Rate Limiting

Console.text includes intelligent rate limiting to prevent spam:

- **Token Bucket Algorithm**: Smooth rate limiting with burst capacity
- **Severity-based Costs**: Critical errors cost fewer tokens
- **Client-side Queuing**: Messages queued during rate limits
- **Automatic Retry**: Failed messages automatically retried

```javascript
// Rate limit configuration
configure({
  apiKey: "your-api-key",
  rateLimitPerMinute: 60, // 60 messages per minute
  retryAttempts: 3, // Retry failed messages 3 times
  enabled: process.env.NODE_ENV === "production",
});
```

## 🏗️ Architecture

```
Your App → console.text Client → Edge API → Telegram Bot API
    ↓              ↓                ↓            ↓
Queue/Retry → Rate Limiting → Database → Your Telegram
```

- **Client Library**: Smart queuing and rate limiting
- **Edge API**: Global serverless functions for low latency
- **Database**: Message history and project management
- **Dashboard**: React/Next.js application

## 📦 API Reference

### Configuration

```typescript
interface ConsoleTextConfig {
  apiKey: string; // Your API key (required)
  apiEndpoint?: string; // Custom API endpoint
  projectId?: string; // Project identifier
  environment?: string; // Environment (dev/staging/prod)
  enabled?: boolean; // Enable/disable (default: true)
  rateLimitPerMinute?: number; // Rate limit (default: 60)
  debug?: boolean; // Debug logging (default: false)
  retryAttempts?: number; // Retry attempts (default: 3)
}
```

### Methods

```typescript
// Configuration
configure(config: ConsoleTextConfig): void

// Send messages
text(message: string, severity?: SeverityLevel, metadata?: object): Promise<boolean>
critical(message: string, metadata?: object): Promise<boolean>
error(message: string, metadata?: object): Promise<boolean>
warning(message: string, metadata?: object): Promise<boolean>
info(message: string, metadata?: object): Promise<boolean>

// Status and control
getStatus(): StatusInfo
updateConfig(config: Partial<ConsoleTextConfig>): void
clearQueue(): void
```

## 🔧 Environment Support

- **Node.js**: 16+ (ES modules and CommonJS)
- **Browser**: Modern browsers with ES2020 support
- **React/Vue/Angular**: Works with all major frameworks
- **TypeScript**: Full type definitions included
- **Edge Runtime**: Vercel, Cloudflare Workers, etc.

## 💰 Pricing

### Free Tier

- 100 messages/month
- 1 project
- Basic dashboard
- Community support

### Pro ($9/month)

- 10,000 messages/month
- Unlimited projects
- Advanced analytics
- Email support

### Team ($29/month)

- 100,000 messages/month
- Team collaboration
- Custom rate limits
- Priority support

### Enterprise (Custom)

- Unlimited messages
- On-premise deployment
- SLA guarantees
- Dedicated support

## 🛠️ Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/console-text/console-text
cd console-text

# Install dependencies
npm install

# Start development servers
npm run dev
```

### Project Structure

```
console-text/
├── packages/
│   ├── client/          # NPM package (console.text)
│   └── dashboard/       # Next.js dashboard + API
├── docs/               # Documentation
└── examples/           # Usage examples
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📚 Examples

Check out the [`examples/`](./examples) directory for:

- **Express.js Integration**
- **Next.js Error Boundaries**
- **Database Error Monitoring**
- **API Performance Tracking**
- **E-commerce Order Alerts**

## 🤝 Support

- **Documentation**: [console-text.dev/docs](https://console-text.dev/docs)
- **Discord Community**: [Join our Discord](https://discord.gg/console-text)
- **GitHub Issues**: [Report bugs here](https://github.com/console-text/console-text/issues)
- **Email Support**: [support@console-text.dev](mailto:support@console-text.dev)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for developers who want to sleep better at night.**

[Get Started](https://console-text.dev) • [Documentation](https://console-text.dev/docs) • [Dashboard](https://console-text.dev/dashboard)
