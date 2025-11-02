import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'https://aurora-ledger-backend.onrender.com';
const TOKEN = process.env.AUTH_TOKEN; // Bạn cần lấy token từ browser localStorage

async function cleanProductionTransactions() {
  try {
    console.log('🧹 Cleaning production database...\n');
    
    if (!TOKEN) {
      console.error('❌ AUTH_TOKEN not found!');
      console.log('📝 Instructions:');
      console.log('1. Open browser and login to your app');
      console.log('2. Open DevTools Console (F12)');
      console.log('3. Type: localStorage.getItem("token")');
      console.log('4. Copy the token and run:');
      console.log('   set AUTH_TOKEN=your_token_here');
      console.log('   node clean-production.js');
      process.exit(1);
    }
    
    // Get all transactions first
    const listResponse = await axios.get(`${BACKEND_URL}/api/transactions?limit=1000`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    
    const transactions = listResponse.data.transactions || listResponse.data || [];
    console.log(`📊 Found ${transactions.length} transactions\n`);
    
    if (transactions.length === 0) {
      console.log('✅ No transactions to clean!');
      process.exit(0);
    }
    
    // Show all transactions
    transactions.forEach((t, i) => {
      console.log(`${i + 1}. ID: ${t.id} | ${t.type} | ${t.amount} ${t.currency} | ${t.description || 'N/A'}`);
    });
    
    // Find the 250,000 VND transaction (or ask user to specify)
    const keepTransaction = transactions.find(t => 
      parseFloat(t.amount) === 250000 && t.currency === 'VND'
    );
    
    if (!keepTransaction) {
      console.log('\n⚠️  250,000 VND transaction not found!');
      console.log('Please manually specify which transaction to keep.');
      process.exit(1);
    }
    
    console.log(`\n✅ Keeping transaction ID: ${keepTransaction.id} (${keepTransaction.amount} ${keepTransaction.currency})`);
    console.log(`🗑️  Will delete ${transactions.length - 1} test transactions\n`);
    
    // Bulk delete
    const deleteResponse = await axios.post(
      `${BACKEND_URL}/api/transactions/bulk-delete-test`,
      { keep_ids: [keepTransaction.id] },
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
    
    console.log(`✅ Deleted ${deleteResponse.data.deleted_count} transactions`);
    console.log(`📋 Remaining: 1 transaction (ID: ${keepTransaction.id})`);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.log('\n🔑 Token expired or invalid. Please get a new token.');
    }
    process.exit(1);
  }
}

cleanProductionTransactions();
