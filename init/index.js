const mongoose = require("mongoose");
const initData = require("./data.js");
const Listings = require("../models/listings.js");
const User = require("../models/user");

async function initDB() {
  try {
    await mongoose.connect("mongodb://mongo:27017/wanderlust");
    console.log("DB connected for seeding");

    const admin = await User.findOne({ username: "Admin" });

    if (!admin) {
      throw new Error("Admin user not found. Seed users first.");
    }

    await Listings.deleteMany({});

    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: admin._id,
    }));

    await Listings.insertMany(initData.data);
    console.log("Data initialized");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

initDB();
