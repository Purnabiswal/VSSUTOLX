import 'dotenv/config';
import connectDatabase from '../config/db.js';
import User from '../models/User.js';

await connectDatabase();

const email = process.env.ADMIN_EMAIL || 'admin@vssutolx.local';
const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';

const existing = await User.findOne({ email });
if (existing) {
  console.log(`Admin already exists: ${email}`);
  process.exit(0);
}

await User.create({
  name: 'VSSUT OLX Admin',
  email,
  password,
  role: 'admin',
  branch: 'Administration',
});

console.log(`Admin created: ${email}`);
process.exit(0);
