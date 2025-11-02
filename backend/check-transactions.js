import pool from './config/database.js';

async function checkTransactions() {
  try {
    // Get all transactions
    const result = await pool.query(`
      SELECT id, type, amount, currency, description, transaction_date
      FROM transactions
      ORDER BY transaction_date DESC
      LIMIT 20
    `);

    console.log('\n📊 Recent Transactions:');
    console.log('='.repeat(80));
    
    if (result.rows.length === 0) {
      console.log('No transactions found!');
    } else {
      result.rows.forEach((t, index) => {
        console.log(`${index + 1}. ID: ${t.id}`);
        console.log(`   Type: ${t.type}`);
        console.log(`   Amount: ${t.amount} ${t.currency}`);
        console.log(`   Description: ${t.description || 'N/A'}`);
        console.log(`   Date: ${t.transaction_date}`);
        console.log('-'.repeat(80));
      });
      
      // Summary by currency
      const summary = {};
      result.rows.forEach(t => {
        if (!summary[t.currency]) {
          summary[t.currency] = { count: 0, total: 0 };
        }
        summary[t.currency].count++;
        summary[t.currency].total += parseFloat(t.amount);
      });
      
      console.log('\n📈 Summary by Currency:');
      console.log('='.repeat(80));
      Object.entries(summary).forEach(([currency, data]) => {
        console.log(`${currency}: ${data.count} transactions, Total: ${data.total.toFixed(2)}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkTransactions();
