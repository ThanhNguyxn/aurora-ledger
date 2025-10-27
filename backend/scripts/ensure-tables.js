import dotenv from 'dotenv';
import pool from '../config/database.js';

dotenv.config();

async function ensureTables() {
  const client = await pool.connect();
  
  try {
    console.log('🔍 Checking database tables...');

    // Check if password_resets table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'password_resets'
      );
    `);

    if (!tableCheck.rows[0].exists) {
      console.log('⚠️  password_resets table missing - creating now...');
      
      await client.query(`
        CREATE TABLE password_resets (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          token VARCHAR(255) UNIQUE NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX idx_password_resets_token ON password_resets(token);
        CREATE INDEX idx_password_resets_expires ON password_resets(expires_at);
      `);
      
      console.log('✅ password_resets table created');
    } else {
      console.log('✅ password_resets table exists');
    }

    // Check if users table has currency column
    const columnCheck = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'currency';
    `);

    if (columnCheck.rows.length === 0) {
      console.log('⚠️  currency column missing - adding now...');
      
      await client.query(`
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'USD';
      `);
      
      console.log('✅ currency column added');
    } else {
      console.log('✅ currency column exists');
    }

    // Check if exchange_rates table exists
    const exchangeCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'exchange_rates'
      );
    `);

    if (!exchangeCheck.rows[0].exists) {
      console.log('⚠️  exchange_rates table missing - creating now...');
      
      await client.query(`
        CREATE TABLE exchange_rates (
          id SERIAL PRIMARY KEY,
          from_currency VARCHAR(3) NOT NULL,
          to_currency VARCHAR(3) NOT NULL,
          rate DECIMAL(20, 6) NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(from_currency, to_currency)
        );

        CREATE INDEX idx_exchange_rates_currencies 
        ON exchange_rates(from_currency, to_currency);
      `);
      
      console.log('✅ exchange_rates table created');
    } else {
      console.log('✅ exchange_rates table exists');
    }

    console.log('🎉 All tables verified and ready!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

ensureTables().catch(console.error);

