import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import transactionRoutes from './routes/transactions.js';
import budgetRoutes from './routes/budgets.js';
import reportRoutes from './routes/reports.js';
import currencyRoutes from './routes/currency.js';
import oauthRoutes from './routes/oauth.js';
import passwordResetRoutes from './routes/password-reset.js';
import recurringRoutes from './routes/recurring.js';
import profileRoutes from './routes/profile.js';
import adminRoutes from './routes/admin.js';
import setupRoutes from './routes/setup.js';
import { processRecurringTransactions } from './utils/recurring-processor.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://aurora-ledger.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport
app.use(passport.initialize());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', oauthRoutes);
app.use('/api/auth', passwordResetRoutes);
app.use('/api/setup', setupRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/currency', currencyRoutes);
app.use('/api/recurring', recurringRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Setup recurring transactions cron job
// Run every day at 00:05 (5 minutes after midnight)
cron.schedule('5 0 * * *', async () => {
  console.log('⏰ Running scheduled recurring transactions processor...');
  try {
    await processRecurringTransactions();
  } catch (error) {
    console.error('❌ Scheduled recurring processing failed:', error);
  }
});

// Also run on server startup (optional, for immediate processing)
if (process.env.PROCESS_RECURRING_ON_STARTUP === 'true') {
  console.log('🔄 Processing recurring transactions on startup...');
  processRecurringTransactions().catch(err => {
    console.error('❌ Startup recurring processing failed:', err);
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || '*'}`);
  console.log(`⏰ Recurring transactions cron job scheduled (daily at 00:05)`);
});

export default app;

