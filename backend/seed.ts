import { createUser } from './src/services/supabaseService';
import bcrypt from 'bcryptjs';

// Hardcode Supabase credentials for seed script
process.env.SUPABASE_URL = "https://tylmscjtbfbmwwpxoetw.supabase.co";
process.env.SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5bG1zY2p0YmZibXd3cHhvZXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1Njk3MTQsImV4cCI6MjA5MTE0NTcxNH0.qX6jYPZ7VsbR6zpELDWPlMlydELifqfZHDKurAa_KW8";

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