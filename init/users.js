const mongoose = require("mongoose");
const User = require("../models/user");

async function seedUsers() {
  await mongoose.connect("mongodb://mongo:27017/wanderlust");

  await User.deleteMany({});

  const user = new User({
    email: "admin@test.com",
    username: "Admin"
  });

  await User.register(user, "password123");

  console.log("✅ User seeded");
  process.exit();
}

seedUsers();
