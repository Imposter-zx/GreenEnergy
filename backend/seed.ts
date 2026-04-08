import dotenv from 'dotenv';
import { createUser } from './src/services/supabaseService';
import bcrypt from 'bcryptjs';

// Load environment variables from .env file in project root
dotenv.config({ path: __dirname + '/../../.env' });

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create a demo user
  const user = await createUser({
    email: 'demo@greenenergy.com',
    password: hashedPassword,
    role: 'INDIVIDUAL',
    name: 'Jan Green',
  });

  console.log('User created:', user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });