require("dotenv").config();

const bcrypt = require("bcryptjs");

const { connectDB, mongoose } = require("../src/config/db");
const User = require("../src/models/User");

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD are required");
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 12);

  await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    {
      name: process.env.ADMIN_SEED_NAME || "HireInfinity Admin",
      email: email.toLowerCase(),
      passwordHash,
      role: "ADMIN",
    },
    { upsert: true, new: true, runValidators: true },
  );

  console.log(`Seeded admin user ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
