import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(() => {
    console.log('✅ Connected to database successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('✖ Error connecting to database:', err.message);
    process.exit(1);
  });