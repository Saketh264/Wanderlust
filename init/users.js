const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected for user seeding");

    await User.deleteMany({});

    const user = new User({
      email: "admin@test.com",
      username: "Admin",
    });

    await User.register(user, "password123");

    console.log("✅ Admin user seeded");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedUsers();
