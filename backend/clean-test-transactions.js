import pool from './config/database.js';

async function cleanTestTransactions() {
  try {
    console.log('🧹 Cleaning test transactions...\n');
    
    // Keep only the 250,000 VND transaction (ID: 59)
    // Delete all others
    const result = await pool.query(`
      DELETE FROM transactions
      WHERE id != 59
      RETURNING id, type, amount, currency
    `);
    
    console.log(`✅ Deleted ${result.rows.length} test transactions\n`);
    
    // Show remaining transactions
    const remaining = await pool.query(`
      SELECT id, type, amount, currency, description, transaction_date
      FROM transactions
      ORDER BY transaction_date DESC
    `);
    
    console.log('📋 Remaining transactions:');
    console.log('='.repeat(80));
    remaining.rows.forEach((t, index) => {
      console.log(`${index + 1}. ID: ${t.id} | ${t.type} | ${t.amount} ${t.currency} | ${t.description || 'N/A'}`);
    });
    
    if (remaining.rows.length === 0) {
      console.log('No transactions remaining!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanTestTransactions();
