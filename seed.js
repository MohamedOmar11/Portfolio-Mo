import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const email = 'MohamedOmar@example.com';
  const password = '102030Mm.?';

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('Admin user already exists');
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ email, passwordHash });
    console.log('Admin user created: MohamedOmar@example.com / 102030Mm.?');
  }

  await mongoose.disconnect();
}

seed();
