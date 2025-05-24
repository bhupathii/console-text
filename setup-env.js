#!/usr/bin/env node

/**
 * Console.text Environment Setup Script
 * Helps generate and validate environment variables for OAuth setup
 */

const crypto = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateSecret() {
  return crypto.randomBytes(32).toString("base64");
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("\n🔧 Console.text Environment Setup\n");
  console.log(
    "This script will help you generate the required environment variables.\n"
  );

  // Generate NextAuth secret
  const secret = generateSecret();
  console.log("✅ Generated NEXTAUTH_SECRET:", secret);

  console.log("\n📋 Required Environment Variables:");
  console.log("Copy these to your Vercel Environment Variables:\n");

  console.log("NEXTAUTH_URL=https://console-text.vercel.app");
  console.log(`NEXTAUTH_SECRET=${secret}`);
  console.log("GOOGLE_CLIENT_ID=your-google-client-id-here");
  console.log("GOOGLE_CLIENT_SECRET=your-google-client-secret-here");
  console.log("NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here");
  console.log("SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here");

  console.log("\n🔗 Next Steps:");
  console.log("1. Set up Google OAuth: https://console.cloud.google.com/");
  console.log("2. Set up Supabase: https://supabase.com/");
  console.log("3. Add the environment variables to Vercel");
  console.log("4. Redeploy your application");
  console.log(
    "\n📖 For detailed instructions, see: packages/dashboard/SETUP.md\n"
  );

  const createLocal = await question(
    "Create .env.local for local development? (y/n): "
  );

  if (createLocal.toLowerCase() === "y") {
    const fs = require("fs");
    const path = require("path");

    const envContent = `# Console.text Local Environment Variables
# Copy this file to packages/dashboard/.env.local and fill in your values

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${secret}
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key-here
`;

    const envPath = path.join(
      __dirname,
      "packages",
      "dashboard",
      ".env.local.example"
    );
    fs.writeFileSync(envPath, envContent);
    console.log(`✅ Created ${envPath}`);
    console.log("Copy this file to .env.local and update with your values.");
  }

  rl.close();
}

main().catch(console.error);
