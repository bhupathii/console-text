#!/usr/bin/env node

/**
 * Update Telegram Configuration in Database
 *
 * This script updates the project in Supabase with Telegram bot credentials.
 */

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: "./packages/dashboard/.env.local" });

async function updateTelegramConfig() {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log("🔧 Updating Telegram configuration in database...\n");

    const botToken = "7365455861:AAHB8_J4Mnje9Cf5D8w3lFM8ZIQrOLrMMSo";
    const chatId = "-1002520035259";

    // Update the first project with Telegram credentials
    const { data, error } = await supabase
      .from("projects")
      .update({
        telegram_bot_token: botToken,
        telegram_chat_id: chatId,
        updated_at: new Date().toISOString(),
      })
      .eq("api_key", "ct_92fd44bef90dd9bafa24509c37c2d70f")
      .select();

    if (error) {
      console.error("❌ Error updating project:", error.message);
      return;
    }

    if (data && data.length > 0) {
      const project = data[0];
      console.log("✅ Project updated successfully!");
      console.log(`   📛 Name: ${project.name}`);
      console.log(`   🔑 API Key: ${project.api_key}`);
      console.log(
        `   🤖 Bot Token: ${project.telegram_bot_token.substring(0, 10)}...`
      );
      console.log(`   💬 Chat ID: ${project.telegram_chat_id}`);
      console.log(
        `   📅 Updated: ${new Date(project.updated_at).toLocaleString()}`
      );
    } else {
      console.log("⚠️  No project found with that API key");
    }

    // Test the Telegram bot connection
    console.log("\n🧪 Testing Telegram bot connection...");

    const testResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getMe`
    );
    const testData = await testResponse.json();

    if (testData.ok) {
      console.log("✅ Telegram bot connection successful!");
      console.log(`   🤖 Bot Name: ${testData.result.first_name}`);
      console.log(`   👤 Username: @${testData.result.username}`);
    } else {
      console.log("❌ Telegram bot connection failed:", testData.description);
    }

    // Send a test message
    console.log("\n📤 Sending test message...");

    const messageResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: "🎉 *Console.text is now configured!*\n\nYour Telegram bot is working correctly. You'll now receive real-time alerts for your applications.",
          parse_mode: "Markdown",
        }),
      }
    );

    const messageData = await messageResponse.json();

    if (messageData.ok) {
      console.log("✅ Test message sent successfully!");
      console.log("📱 Check your Telegram group for the test message");
    } else {
      console.log("❌ Failed to send test message:", messageData.description);
    }

    console.log(
      "\n🚀 Configuration complete! Now run: node test-console-text.js"
    );
  } catch (error) {
    console.error("💥 Unexpected error:", error.message);
  }
}

updateTelegramConfig();
