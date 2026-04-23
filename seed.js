import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Load from .env.local if present
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Setup a minimal User schema so we can insert directly into the collection
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

// Avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
      console.error('ADMIN_PASSWORD is not defined');
      process.exit(1);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists:', email);
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      await User.create({ email, passwordHash });
      console.log('Admin user created successfully:', email);
    }
  } catch (error) {
    console.error('Error connecting or seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();
