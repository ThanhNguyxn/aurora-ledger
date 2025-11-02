import axios from 'axios';

const BACKEND_URL = 'https://aurora-ledger-backend.onrender.com';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlkIjo1LCJlbWFpbCI6ImdhbWVtYXN0ZXJ2bjEyM0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2MjA3NDEyNiwiZXhwIjoxNzYyNjc4OTI2fQ.P9wINNY3Kc9fwSM_-0A4mMdDMlEHcJvNnXHKIFb8stc';

async function testAPI() {
  try {
    console.log('🔍 Testing Transactions API...\n');
    
    // Test with VND
    console.log('1️⃣ Testing with VND:');
    const vndRes = await axios.get(`${BACKEND_URL}/api/transactions`, {
      params: { 
        display_currency: 'VND',
        limit: 10
      },
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    console.log('VND Response:', JSON.stringify(vndRes.data, null, 2));
    
    // Test with USD
    console.log('\n2️⃣ Testing with USD:');
    const usdRes = await axios.get(`${BACKEND_URL}/api/transactions`, {
      params: { 
        display_currency: 'USD',
        limit: 10
      },
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    console.log('USD Response:', JSON.stringify(usdRes.data, null, 2));
    
    // Test Reports date range
    console.log('\n3️⃣ Testing with Reports date range (VND):');
    const reportsRes = await axios.get(`${BACKEND_URL}/api/transactions`, {
      params: { 
        display_currency: 'VND',
        start_date: '2025-09-01',
        end_date: '2025-11-30',
        limit: 1000
      },
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    console.log('Reports Response:', JSON.stringify(reportsRes.data, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAPI();
