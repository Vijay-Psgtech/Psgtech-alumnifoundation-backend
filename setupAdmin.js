

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");

async function createAdmin() {
  try {
    // Connect to MongoDB
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect("mongodb://localhost:27017/psg_alumni");
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: "psg_ct_admin@gmail.com" });
    if (existingAdmin) {
      console.log("⚠️  Admin already exists!");
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Name: ${existingAdmin.fullName}`);
      console.log("No changes made.");
      process.exit(0);
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("psg_ct_admin", salt);

    // Create admin
    console.log("👤 Creating admin user...");
    const admin = new Admin({
      email: "psg_ct_admin@gmail.com",
      password: hashedPassword,
      fullName: "PSG Alumni Admin",
      role: "super_admin",
      isActive: true,
    });

    // Save to database
    await admin.save();

    console.log("\n" + "═".repeat(70));
    console.log("✅ ADMIN USER CREATED SUCCESSFULLY!");
    console.log("═".repeat(70));
    console.log("\n📋 Admin Credentials:");
    console.log("─".repeat(70));
    console.log(`Email:    psg_ct_admin@gmail.com`);
    console.log(`Password: psg_ct_admin`);
    console.log(`Role:     super_admin`);
    console.log(`Status:   Active`);
    console.log("─".repeat(70));
    console.log("\n🔗 Login URL: http://localhost:5173/admin");
    console.log("\n⚠️  Keep these credentials secure!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("\nDebugging tips:");
    console.error("1. Make sure MongoDB is running");
    console.error("2. Check connection string: mongodb://localhost:27017/psg_alumni");
    console.error("3. Verify Admin model exists at ./models/Admin.js");
    console.error("4. Check bcryptjs is installed: npm install bcryptjs");
    process.exit(1);
  }
}

// Run the function
createAdmin();