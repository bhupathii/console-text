#!/usr/bin/env node

/**
 * Get API Key from Supabase Database
 *
 * This script retrieves an API key from your Supabase database
 * so you can test the console.text functionality.
 */

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: "./packages/dashboard/.env.local" });

async function getApiKey() {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    console.log("🔍 Fetching API key from database...\n");

    // Get existing project or create one
    let { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Error fetching projects:", error.message);
      return;
    }

    if (!projects || projects.length === 0) {
      console.log("📝 No projects found. Creating a new one...");

      // Create a new project
      const { data: newProject, error: insertError } = await supabase
        .from("projects")
        .insert({
          name: "Test Project",
          api_key:
            "ct_" +
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          enabled: true,
        })
        .select()
        .single();

      if (insertError) {
        console.error("❌ Error creating project:", insertError.message);
        return;
      }

      projects = [newProject];
    }

    const project = projects[0];

    console.log("✅ Project found:");
    console.log(`   📛 Name: ${project.name}`);
    console.log(`   🔑 API Key: ${project.api_key}`);
    console.log(`   🎯 Project ID: ${project.id}`);
    console.log(`   ✅ Enabled: ${project.enabled}`);
    console.log(
      `   📅 Created: ${new Date(project.created_at).toLocaleString()}`
    );

    if (project.telegram_bot_token) {
      console.log(
        `   🤖 Bot Token: ${project.telegram_bot_token.substring(0, 10)}...`
      );
    } else {
      console.log(`   🤖 Bot Token: Not configured`);
    }

    if (project.telegram_chat_id) {
      console.log(`   💬 Chat ID: ${project.telegram_chat_id}`);
    } else {
      console.log(`   💬 Chat ID: Not configured`);
    }

    console.log("\n📋 To test console.text:");
    console.log(`1. Copy this API key: ${project.api_key}`);
    console.log(`2. Replace "ct_your_api_key_here" in test-console-text.js`);
    console.log(`3. Run: node test-console-text.js`);

    if (!project.telegram_bot_token || !project.telegram_chat_id) {
      console.log(
        "\n⚠️  Note: Telegram bot not configured. Messages will be stored in database but not sent to Telegram."
      );
      console.log("   To configure Telegram:");
      console.log("   1. Create a bot with @BotFather");
      console.log("   2. Add bot token and chat ID to your .env.local");
      console.log("   3. Update the project in Supabase");
    }
  } catch (error) {
    console.error("💥 Unexpected error:", error.message);

    if (error.message.includes("Invalid API key")) {
      console.log("\n🔧 Make sure your .env.local file is configured with:");
      console.log("   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url");
      console.log("   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
    }
  }
}

// Check if environment variables are set
if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  console.log("❌ Environment variables not found!");
  console.log(
    "\nMake sure you have created .env.local in packages/dashboard/ with:"
  );
  console.log(
    "NEXT_PUBLIC_SUPABASE_URL=https://rmuwpnlgkuphctznykli.supabase.co"
  );
  console.log("SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
  process.exit(1);
}

getApiKey();
